class Level {
	constructor(data) {
    this.rows =
      data
        .trim()
        .split('\n')
        .map(row => [...row]);
	}
}

export default Level;
