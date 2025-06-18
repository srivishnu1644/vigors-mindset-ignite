
-- Create a bucket for medical analysis PDFs
insert into storage.buckets (id, name, public)
values ('body-analysis-pdfs', 'body-analysis-pdfs', true);

-- Grant public read access for files in this bucket (for easy user preview).
-- (Modify to stricter RLS if you'd like the files privately accessible only! See docs for details)
