export const convertTime = (time: number) => {
  let mins: string | number = Math.floor(time / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  var secs: string | number = Math.floor(time % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  return mins + ":" + secs;
};

export const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return (
    (+minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (+seconds < 10 ? "0" : "") +
    seconds
  );
};
