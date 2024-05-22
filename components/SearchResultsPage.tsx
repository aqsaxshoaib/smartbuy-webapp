import React from 'react';

interface SearchResult {
  content: {
    url: string;
    title: string;
  };
}

interface Props {
  results: SearchResult[];
}

const SearchResultsPage: React.FC<Props> = ({ results }) => {
  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <a href={result.content.url}>{result.content.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsPage;
