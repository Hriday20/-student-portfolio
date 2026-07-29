function RepoList({ repos }) {
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>
          <h3>{repo.name}</h3>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Repository
          </a>
        </li>
      ))}
    </ul>
  );
}

export default RepoList;