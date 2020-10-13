class PostGenerator {
  constructor(context) {
    this.data = {};
    this.fetchData(context);
  }

  fetchData(context) {
    fetch(`/${context}/meta/data.json`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.data = data;
      });
  }
}
