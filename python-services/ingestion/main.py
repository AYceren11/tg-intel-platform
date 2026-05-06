import asyncio
import os
from telethon import TelegramClient, events
from dotenv import load_dotenv
import pyodbc
from datetime import datetime

load_dotenv()

API_ID = os.getenv('TG_API_ID')
API_HASH = os.getenv('TG_API_HASH')
SESSION_NAME = 'tg_intelligence'
CONN_STR = os.getenv('DATABASE_URL_PY') # MSSQL connection string for pyodbc

async def store_message(msg):
    try:
        conn = pyodbc.connect(CONN_STR)
        cursor = conn.cursor()
        
        # Insert User if not exists
        cursor.execute("""
            IF NOT EXISTS (SELECT 1 FROM TelegramUser WHERE id = ?)
            INSERT INTO TelegramUser (id, username, firstName, lastName, createdAt)
            VALUES (?, ?, ?, ?, ?)
        """, (str(msg.sender_id), str(msg.sender_id), msg.sender.username, msg.sender.first_name, msg.sender.last_name, datetime.now()))
        
        # Insert Message
        cursor.execute("""
            INSERT INTO Message (telegramId, chatId, userId, text, timestamp)
            VALUES (?, ?, ?, ?, ?)
        """, (msg.id, str(msg.chat_id), str(msg.sender_id), msg.text, msg.date))
        
        # Handle Interactions (Replies)
        if msg.reply_to_msg_id:
            reply_msg = await msg.get_reply_message()
            if reply_msg:
                cursor.execute("""
                    INSERT INTO Interaction (sourceUserId, targetUserId, type, timestamp)
                    VALUES (?, ?, ?, ?)
                """, (str(msg.sender_id), str(reply_msg.sender_id), 'reply', msg.date))
        
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error storing message: {e}")

async def main():
    client = TelegramClient(SESSION_NAME, API_ID, API_HASH)
    
    @client.on(events.NewMessage)
    async def handler(event):
        if event.message.text:
            print(f"New message from {event.sender_id}: {event.message.text[:50]}...")
            await store_message(event.message)

    await client.start()
    print("Telegram Ingestion Service Started...")
    await client.run_until_disconnected()

if __name__ == '__main__':
    asyncio.run(main())
