create or replace function match_pdf_vectors (
  query_embedding vector,
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    pdf_vectors.id,
    pdf_vectors.content,
    1 - (pdf_vectors.embedding <=> query_embedding) as similarity
  from pdf_vectors
  where 1 - (pdf_vectors.embedding <=> query_embedding) > match_threshold
  order by pdf_vectors.embedding <=> query_embedding
  limit match_count;
end;
$$; 