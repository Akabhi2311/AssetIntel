from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

dimension = 384

# MAIN VECTOR INDEX
index = faiss.IndexFlatL2(dimension)

# STORED DATA
documents = []
document_users = []
document_filenames = []
document_embeddings = []

document_ids = []
# ADD TEXT
def add_text(user_id, text,document_id=None):

    embedding = model.encode([text])

    embedding = np.array(embedding).astype("float32")

    index.add(embedding)

    documents.append(text)

    document_users.append(user_id)

    document_ids.append(document_id)

    document_embeddings.append(embedding[0])


# SEARCH
def search(
    user_id,
    query,
    document_id=None,
    top_k=5
):

    if len(documents) == 0:
        return []

    query_embedding = model.encode([query])

    query_embedding = np.array(
        query_embedding
    ).astype("float32")

    filtered_embeddings = []
    filtered_texts = []

    # FILTER DOCUMENTS FIRST
    for i in range(len(documents)):

        # USER FILTER
        if document_users[i] != user_id:
            continue

        # PDF FILTER
        if document_id:

            if document_ids[i] != document_id:
                continue

        filtered_embeddings.append(
            document_embeddings[i]
        )

        filtered_texts.append(
            documents[i]
        )

    # NO MATCHES
    if len(filtered_texts) == 0:
        return []

    filtered_embeddings = np.array(
        filtered_embeddings
    ).astype("float32")

    # TEMP INDEX
    temp_index = faiss.IndexFlatL2(dimension)

    temp_index.add(filtered_embeddings)

    distances, indices = temp_index.search(
        query_embedding,
        min(top_k, len(filtered_texts))
    )

    results = []

    for idx in indices[0]:

        if idx >= len(filtered_texts):
            continue

        results.append(
            filtered_texts[idx]
        )

    print("📊 CHUNKS FOUND:", len(results))

    return results