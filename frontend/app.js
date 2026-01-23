fetch("/api/health")
  .then(res => res.json())
  .then(data => {
    console.log("From API:", data);
  });
