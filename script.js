function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
class CardProfile extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      index: 3,
      currentTime: '0:00',
      musicList: [{ name: 'Bulleya ', author: 'Amit Mishra,Pritam,Shilpa Rao', img: 'https://wallpapercave.com/wp/wp6585111.jpg', audio: 'Bulleya Full Video - ADHM_Ranbir_ Aishwarya_Amit Mishra_Shilpa Rao_Pritam_Karan Johar(mp3).mp3',},

      { name: 'Love Is Cold', author: 'Georgi Kay', img: 'https://c.saavncdn.com/335/Origins-EP-English-2016-20190607044209-500x500.jpg', audio: 'GEORGI KAY - LOVE IS COLD (lyric video)(mp3).mp3',},
     
      { name: 'Eastside', author: 'benny blanco,Halsey', img: 'https://c.saavncdn.com/935/Eastside-English-2018-20180711110552-500x500.jpg', audio: 'benny blanco_ Halsey _ Khalid  Eastside (official video)(mp3).mp3',},

      { name: 'Love Me Like You Do', author: 'Ellie Goulding', img: 'https://img.wynk.in/unsafe/248x248/filters:no_upscale():strip_exif():format(webp)/http://s3-ap-south-1.amazonaws.com/wynk-music-cms/music/4733547.jpg', audio: 'Ellie Goulding - Love Me Like You Do (Official Video)(mp3).mp3',},

      { name: 'Tera Zikr', author: 'Darshan Raval', img: 'https://c.saavncdn.com/820/Tera-Zikr-Hindi-2017-20171108125619-500x500.jpg', audio: 'Tera Zikr - Darshan Raval _ Official Video - Latest New Hit Song(mp3).mp3',}],
      pause: false });_defineProperty(this, "changeCurrentTime",



















    e => {
      const duration = this.playerRef.duration;

      const playheadWidth = this.timelineRef.offsetWidth;
      const offsetWidht = this.timelineRef.offsetLeft;
      const userClickWidht = e.clientX - offsetWidht;

      const userClickWidhtInPercent = userClickWidht * 100 / playheadWidth;

      this.playheadRef.style.width = userClickWidhtInPercent + "%";
      this.playerRef.currentTime = duration * userClickWidhtInPercent / 100;
    });_defineProperty(this, "hoverTimeLine",

    e => {
      const duration = this.playerRef.duration;

      const playheadWidth = this.timelineRef.offsetWidth;

      const offsetWidht = this.timelineRef.offsetLeft;
      const userClickWidht = e.clientX - offsetWidht;
      const userClickWidhtInPercent = userClickWidht * 100 / playheadWidth;

      if (userClickWidhtInPercent <= 100) {
        this.hoverPlayheadRef.style.width = userClickWidhtInPercent + "%";
      }

      const time = duration * userClickWidhtInPercent / 100;

      if (time >= 0 && time <= duration) {
        this.hoverPlayheadRef.dataset.content = this.formatTime(time);
      }
    });_defineProperty(this, "resetTimeLine",

    () => {
      this.hoverPlayheadRef.style.width = 0;
    });_defineProperty(this, "timeUpdate",

    () => {
      const duration = this.playerRef.duration;
      const timelineWidth = this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
      const playPercent = 100 * (this.playerRef.currentTime / duration);
      this.playheadRef.style.width = playPercent + "%";
      const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));
      this.setState({
        currentTime });

    });_defineProperty(this, "formatTime",

    currentTime => {
      const minutes = Math.floor(currentTime / 60);
      let seconds = Math.floor(currentTime % 60);

      seconds = seconds >= 10 ? seconds : "0" + seconds % 60;

      const formatTime = minutes + ":" + seconds;

      return formatTime;
    });_defineProperty(this, "updatePlayer",

    () => {
      const { musicList, index } = this.state;
      const currentSong = musicList[index];
      const audio = new Audio(currentSong.audio);
      this.playerRef.load();
    });_defineProperty(this, "nextSong",

    () => {
      const { musicList, index, pause } = this.state;

      this.setState({
        index: (index + 1) % musicList.length });

      this.updatePlayer();
      if (pause) {
        this.playerRef.play();
      }
    });_defineProperty(this, "prevSong",

    () => {
      const { musicList, index, pause } = this.state;

      this.setState({
        index: (index + musicList.length - 1) % musicList.length });

      this.updatePlayer();
      if (pause) {
        this.playerRef.play();
      }
    });_defineProperty(this, "playOrPause",


    () => {
      const { musicList, index, pause } = this.state;
      const currentSong = musicList[index];
      const audio = new Audio(currentSong.audio);
      if (!this.state.pause) {
        this.playerRef.play();
      } else {
        this.playerRef.pause();
      }
      this.setState({
        pause: !pause });

    });_defineProperty(this, "clickAudio",

    key => {
      const { pause } = this.state;

      this.setState({
        index: key });


      this.updatePlayer();
      if (pause) {
        this.playerRef.play();
      }
    });}componentDidMount() {this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);this.playerRef.addEventListener("ended", this.nextSong, false);this.timelineRef.addEventListener("click", this.changeCurrentTime, false);this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);}componentWillUnmount() {this.playerRef.removeEventListener("timeupdate", this.timeUpdate);this.playerRef.removeEventListener("ended", this.nextSong);this.timelineRef.removeEventListener("click", this.changeCurrentTime);this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);}


  render() {
    const { musicList, index, currentTime, pause } = this.state;
    const currentSong = musicList[index];
    return /*#__PURE__*/(
      React.createElement("div", { className: "card" }, /*#__PURE__*/
      React.createElement("div", { className: "current-song" }, /*#__PURE__*/
      React.createElement("audio", { ref: ref => this.playerRef = ref }, /*#__PURE__*/
      React.createElement("source", { src: currentSong.audio, type: "audio/ogg" }), "Your browser does not support the audio element."), /*#__PURE__*/


      React.createElement("div", { className: "img-wrap" }, /*#__PURE__*/
      React.createElement("img", { src: currentSong.img })), /*#__PURE__*/

      React.createElement("span", { className: "song-name" }, currentSong.name), /*#__PURE__*/
      React.createElement("span", { className: "song-autor" }, currentSong.author), /*#__PURE__*/

      React.createElement("div", { className: "time" }, /*#__PURE__*/
      React.createElement("div", { className: "current-time" }, currentTime), /*#__PURE__*/
      React.createElement("div", { className: "end-time" }, currentSong.duration)), /*#__PURE__*/


      React.createElement("div", { ref: ref => this.timelineRef = ref, id: "timeline" }, /*#__PURE__*/
      React.createElement("div", { ref: ref => this.playheadRef = ref, id: "playhead" }), /*#__PURE__*/
      React.createElement("div", { ref: ref => this.hoverPlayheadRef = ref, class: "hover-playhead", "data-content": "0:00" })), /*#__PURE__*/


      React.createElement("div", { className: "controls" }, /*#__PURE__*/
      React.createElement("button", { onClick: this.prevSong, className: "prev prev-next current-btn" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-backward" })), /*#__PURE__*/

      React.createElement("button", { onClick: this.playOrPause, className: "play current-btn" },

      !pause ? /*#__PURE__*/React.createElement("i", { className: "fas fa-play" }) : /*#__PURE__*/
      React.createElement("i", { class: "fas fa-pause" })), /*#__PURE__*/


      React.createElement("button", { onClick: this.nextSong, className: "next prev-next current-btn" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-forward" })))), /*#__PURE__*/



      React.createElement("div", { className: "play-list" },
      musicList.map((music, key = 0) => /*#__PURE__*/
      React.createElement("div", { key: key,
        onClick: () => this.clickAudio(key),
        className: "track " + (
        index === key && !pause ? 'current-audio' : '') + (
        index === key && pause ? 'play-now' : '') }, /*#__PURE__*/

      React.createElement("img", { className: "track-img", src: music.img }), /*#__PURE__*/
      React.createElement("div", { className: "track-discr" }, /*#__PURE__*/
      React.createElement("span", { className: "track-name" }, music.name), /*#__PURE__*/
      React.createElement("span", { className: "track-author" }, music.author)), /*#__PURE__*/

      React.createElement("span", { className: "track-duration" },
      index === key ?
      currentTime :
      music.duration))))));







  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(CardProfile, null),
document.getElementById('root'));