from fastapi import FastAPI
import networkx as nx
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from community import community_louvain
import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
CONN_STR = os.getenv('DATABASE_URL_PY')

def get_db_connection():
    return pyodbc.connect(CONN_STR)

@app.get("/api/v1/network")
async def get_network_graph():
    conn = get_db_connection()
    df = pd.read_sql("SELECT sourceUserId, targetUserId, type FROM Interaction", conn)
    conn.close()
    
    G = nx.from_pandas_edgelist(df, source='sourceUserId', target='targetUserId', edge_attr='type')
    
    # Compute metrics
    degree_centrality = nx.degree_centrality(G)
    betweenness = nx.betweenness_centrality(G)
    partition = community_louvain.best_partition(G)
    
    nodes = []
    for node in G.nodes():
        nodes.append({
            "id": node,
            "degree": degree_centrality.get(node, 0),
            "betweenness": betweenness.get(node, 0),
            "community": partition.get(node, 0)
        })
    
    edges = []
    for u, v, d in G.edges(data=True):
        edges.append({
            "from": u,
            "to": v,
            "type": d['type']
        })
        
    return {"nodes": nodes, "edges": edges}

@app.get("/api/v1/trends")
async def get_trends():
    conn = get_db_connection()
    df = pd.read_sql("SELECT text FROM Message WHERE text IS NOT NULL", conn)
    conn.close()
    
    if df.empty:
        return {"trends": []}
        
    vectorizer = TfidfVectorizer(stop_words='english', max_features=20)
    tfidf_matrix = vectorizer.fit_transform(df['text'])
    feature_names = vectorizer.get_feature_names_out()
    
    trends = []
    for i, feature in enumerate(feature_names):
        trends.append({
            "keyword": feature,
            "score": tfidf_matrix.sum(axis=0).tolist()[0][i]
        })
        
    return {"trends": sorted(trends, key=lambda x: x['score'], reverse=True)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
