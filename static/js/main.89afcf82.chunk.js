(this.webpackJsonpkalimba=this.webpackJsonpkalimba||[]).push([[0],{166:function(e,t,a){},172:function(e,t,a){},188:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a(7),r=a.n(i),c=a(67),o=a.n(c),s=a(9),l=a(10),u=a(15),b=a(14),h=(a(166),a(3)),d=a(16),p=a(18),j=function(e){Object(u.a)(a,e);var t=Object(b.a)(a);function a(e){var i,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{top:0,right:0,bottom:0,left:0},c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,l=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],u=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];Object(s.a)(this,a),(i=t.call(this,e)).onResize=function(){},i.increaseRows=function(){var e=i.state,t=e.rowSpan,a=e.rowlimit,n=e.margin,r=e.canResizeRows,c=i.props.viewSize.outerHeight;if(r&&!(t>=a)){var o=t+1,s=c*o;i.setState({rowSpan:o,viewHeight:s,height:s-n.top-n.bottom},i.onResize)}},i.decreaseRows=function(){var e=i.state,t=e.rowSpan,a=e.margin,n=e.canResizeRows,r=i.props.viewSize.outerHeight;if(n&&!(t<=1)){var c=t-1,o=r*c;i.setState({rowSpan:c,viewHeight:o,height:o-a.top-a.bottom},i.onResize)}},i.increaseColumns=function(){var e=i.state,t=e.columnSpan,a=e.columnLimit,n=e.margin,r=e.canResizeColumns,c=i.props.viewSize.outerWidth;if(r&&!(t>=a)){var o=t+1,s=c*o;i.setState({columnSpan:o,viewWidth:s,width:s-n.left-n.right},i.onResize)}},i.decreaseColumns=function(){var e=i.state,t=e.columnSpan,a=e.margin,n=e.canResizeColumns,r=i.props.viewSize.outerWidth;if(n&&!(t<=1)){var c=t-1,o=r*c;i.setState({columnSpan:c,viewWidth:o,width:o-a.left-a.right},i.onResize)}},i.close=function(){var e=i.props,t=e.toggleView,a=e.name;t&&a&&t(a)},i.getSizeControlHTML=function(){return Object(n.jsxs)("div",{className:"sizeControl",children:[i.state.canResizeRows&&Object(n.jsxs)("span",{children:[Object(n.jsx)("button",{onClick:i.increaseRows,title:"Increase rows",disabled:i.state.rowSpan>=i.state.rowlimit,children:Object(n.jsx)(d.a,{icon:p.b})}),Object(n.jsx)("button",{onClick:i.decreaseRows,title:"Decrease rows",disabled:i.state.rowSpan<=1,children:Object(n.jsx)(d.a,{icon:p.d})})]}),i.state.canResizeColumns&&Object(n.jsxs)("span",{children:[Object(n.jsx)("button",{onClick:i.increaseColumns,title:"Increase columns",disabled:i.state.columnSpan>=i.state.columnLimit,children:Object(n.jsx)(d.a,{icon:p.a})}),Object(n.jsx)("button",{onClick:i.decreaseColumns,title:"Decrease columns",disabled:i.state.columnSpan<=1,children:Object(n.jsx)(d.a,{icon:p.c})})]}),Object(n.jsx)("button",{onClick:i.close,title:"Close",children:Object(n.jsx)(d.a,{icon:p.e})})]})};var b=e.viewSize,h=b.outerWidth,j=b.outerHeight,O=h*o,m=j*c;return i.state={rowSpan:c,columnSpan:o,canResizeRows:l,canResizeColumns:u,rowlimit:12,columnLimit:2,outerWidth:h,outerHeight:j,viewHeight:m,viewWidth:O,margin:r,width:h*o-r.left-r.right,height:j*c-r.top-r.bottom},i}return Object(l.a)(a,[{key:"resizeComponent",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this.props.viewSize,a=t.outerWidth,n=t.outerHeight,i=this.state,r=i.outerWidth,c=i.outerHeight,o=i.margin,s=i.rowSpan,l=i.columnSpan;if(r!==a||c!==n){var u=a*l,b=n*s;this.setState(Object(h.a)(Object(h.a)({},e),{},{outerWidth:a,outerHeight:n,viewWidth:u,viewHeight:b,width:a*l-o.left-o.right,height:n*s-o.top-o.bottom}),this.onResize)}}}]),a}(i.PureComponent),O=a(6),m=(a(172),a(72)),v=a(5),g=a(11),f=function(e){Object(u.a)(a,e);var t=Object(b.a)(a);function a(e){var n;Object(s.a)(this,a);return(n=t.call(this,e,{top:20,right:20,bottom:20,left:20})).componentDidMount=function(){return n.initialize()},n.onResize=function(){n.initialize()},n.initialize=function(){var e=n.state,t=e.width,a=e.height,i=e.margin,r=e.overviewWidth,c=Object(g.e)(n.svg);c.selectAll("*").remove();var o=i.left+t-r,s=Object(g.c)().range([i.left,o-20]),l=Object(g.c)().range([o,o+r]),u=Object(g.c)().range([.75*a,0]),b=Object(g.c)().range([a,0]);O.Canvas.setupCanvas(n.canvas),O.Canvas.setupCanvas(n.highlightCanvas),n.setState({initialized:!0,svg:c,x:s,xOv:l,y:u,yOv:b},n.updateBackground)},n.updateBackground=function(){var e=n.state,t=e.viewWidth,a=e.viewHeight,i=e.x,r=e.xOv,c=e.yOv,o=e.notes,s=n.props.tuning;i.domain([0,s.keyCount+1]),r.domain([0,s.keyCount]);var l=+Object(g.b)(o,(function(e){return e.end}));c.domain([0,l]);var u=n.canvas.getContext("2d");u.clearRect(0,0,t,a),n.drawKeys(u,s),n.drawNotes(u,o,r,c),n.draw()},n.draw=function(){window.requestAnimationFrame((function(){var e=n.state,t=e.viewWidth,a=e.viewHeight,i=e.rowSpan,r=e.margin,c=e.x,o=e.y,s=e.notes,l=n.props.currentPlayerTime;if(s&&0!==s.length){var u=null!==l?l:0,b=u+2*i;o.domain([u,b]);var h=n.highlightCanvas.getContext("2d");h.clearRect(0,0,t,a),n.drawNotes(h,s,c,o),n.drawCurrentPlayerTime(h,u,b),h.clearRect(0,0,t,r.top)}}))},n.drawKeys=function(e,t){var a=n.state,i=a.height,r=a.margin,c=a.x,o=a.pitchPositionMap,s=t.getNotesInInstrumentOrder(),l=Object(g.c)().domain(Object(g.a)(t.pitches)).range([i/4,i/8]),u=c(1)-c(0)-4,b=r.top+.75*i;e.font="16px sans-serif",e.textAlign="center";var h,d=Object(v.a)(s);try{for(d.s();!(h=d.n()).done;){var p=h.value,j=c(o.get(p));e.fillStyle="rgba(255, 255, 255, 0.5)";var m=l(p);e.fillRect(j+2,b,u,m);var f=O.Midi.getMidiNoteByNr(p);e.fillStyle="black";var y=p%12===0?f.label:f.name;e.fillText(y,j+u/2+2,b+m-10)}}catch(w){d.e(w)}finally{d.f()}},n.drawNotes=function(e,t,a,i){var r,c=n.state,o=c.height,s=c.margin,l=c.pitchPositionMap,u=n.props.currentPlayerTime,b=a(1)-a(0),h=b/2,d=g.d,p=Object(v.a)(t);try{for(p.s();!(r=p.n()).done;){var j=r.value,m=i(j.start),f=i(j.end);if(!(m<0||f>o)){e.fillStyle=j.start>=u?d[j.channel%d.length]:"gray";var y=s.top+f,w=Math.max(m-f,1),x=a(l.get(j.pitch));O.Canvas.drawNoteTrapezoidUpwards(e,x,y,b,w,h)}}}catch(S){p.e(S)}finally{p.f()}},n.state=Object(h.a)(Object(h.a)({},n.state),{},{overviewWidth:80,lastData:[],lastTuning:[],notes:[],pitchPositionMap:new Map}),n}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(){this.resizeComponent();var e=this.props,t=e.data,a=e.tuning;if(t!==this.state.lastData||a!==this.state.lastTuning){for(var n=new Map,i=a.getNotesInInstrumentOrder(),r=0;r<i.length;r++)n.set(i[r],r);this.setState({lastData:t,notes:t,lastTuning:a,pitchPositionMap:n},this.updateBackground)}}},{key:"drawCurrentPlayerTime",value:function(e,t,a){var n=this.state,i=n.margin,r=n.overviewWidth,c=n.xOv,o=n.yOv;e.fillStyle="rgba(70, 130, 180, 0.4)";var s=o(a),l=o(t)-s,u=c.range(),b=Object(m.a)(u,1)[0];e.fillRect(b,i.top+s,r,l)}},{key:"render",value:function(){var e=this,t=this.state,a=t.viewWidth,i=t.viewHeight,r=t.margin;return this.canvas&&this.state.initialized&&this.draw(),Object(n.jsxs)("div",{className:"View KalimbaRoll",style:{gridArea:"span ".concat(this.state.rowSpan," / span ").concat(this.state.columnSpan)},children:[Object(n.jsx)("canvas",{className:"ViewCanvas",ref:function(t){return e.canvas=t},style:{width:a,height:i}}),Object(n.jsx)("canvas",{className:"ViewCanvas HighlightCanvas",ref:function(t){return e.highlightCanvas=t},style:{width:a,height:i}}),Object(n.jsx)("svg",{width:a,height:i,children:Object(n.jsx)("g",{ref:function(t){return e.svg=t},transform:"translate(".concat(r.left,", ").concat(r.top,")")})})]})}}]),a}(j),y=a(12),w=a.n(y),x=a(68),S=a(0),C=a(4),P=a(69),k=a.n(P),T=Object(C.a)("frontendUrl"),R=Object(C.a)("playerTimeCallback"),_=Object(C.a)("onStopCallback"),z=Object(C.a)("sound"),N=Object(C.a)("volume"),I=Object(C.a)("speed"),M=Object(C.a)("log"),H=Object(C.a)("instrument"),D=Object(C.a)("audioCtx"),W=Object(C.a)("timerID"),L=Object(C.a)("startTimeStamp"),A=Object(C.a)("startAt"),E=Object(C.a)("endAt"),F=Object(C.a)("notes"),U=Object(C.a)("notesLeftToPlay"),B=Object(C.a)("songDuration"),V=Object(C.a)("isPlaying"),K=Object(C.a)("isPaused"),G=Object(C.a)("lastSoundName"),J=Object(C.a)("validInstruments"),q=function(){function e(t){var a=this;Object(s.a)(this,e),Object.defineProperty(this,T,{writable:!0,value:null}),Object.defineProperty(this,R,{writable:!0,value:null}),Object.defineProperty(this,_,{writable:!0,value:null}),Object.defineProperty(this,z,{writable:!0,value:null}),Object.defineProperty(this,N,{writable:!0,value:1}),Object.defineProperty(this,I,{writable:!0,value:null}),Object.defineProperty(this,M,{writable:!0,value:!1}),this.currentPlayTime=null,Object.defineProperty(this,H,{writable:!0,value:null}),Object.defineProperty(this,D,{writable:!0,value:new AudioContext}),Object.defineProperty(this,W,{writable:!0,value:null}),Object.defineProperty(this,L,{writable:!0,value:null}),Object.defineProperty(this,A,{writable:!0,value:0}),Object.defineProperty(this,E,{writable:!0,value:-1}),Object.defineProperty(this,F,{writable:!0,value:[]}),Object.defineProperty(this,U,{writable:!0,value:[]}),Object.defineProperty(this,B,{writable:!0,value:null}),Object.defineProperty(this,V,{writable:!0,value:!1}),Object.defineProperty(this,K,{writable:!0,value:!1}),Object.defineProperty(this,G,{writable:!0,value:null}),Object.defineProperty(this,J,{writable:!0,value:new Map([["acoustic_grand_piano",{name:"acoustic_grand_piano",desciption:"Acoustic grand piano"}],["acoustic_guitar_nylon",{name:"acoustic_guitar_nylon",desciption:"Acoustic guitar nylon"}],["acoustic_guitar_steel",{name:"acoustic_guitar_steel",desciption:"Acoustic guitar steel"}],["distortion_guitar",{name:"distortion_guitar",desciption:"Distortion guitar"}],["electric_bass_finger",{name:"electric_bass_finger",desciption:"Electric bass finger"}],["electric_bass_pick",{name:"electric_bass_pick",desciption:"Electric bass pick"}],["electric_guitar_clean",{name:"electric_guitar_clean",desciption:"Electric guitar clean"}],["electric_guitar_muted",{name:"electric_guitar_muted",desciption:"Electric guitar muted"}],["overdriven_guitar",{name:"overdriven_guitar",desciption:"Overdriven guitar"}],["kalimba",{name:"kalimba",desciption:"Kalimba"}],["percussion",{name:"percussion",desciption:"Percussion",font:"FluidR3_GM"}]])}),this.onTimeChange=function(e){return Object(S.a)(a,R)[R]=e,a},this.onStop=function(e){return Object(S.a)(a,_)[_]=e,a},this.getAvailableInstruments=function(){return Array.from(Object(S.a)(a,J)[J].values())},this.setVolume=function(e){return Object(S.a)(a,N)[N]=e,a},this.setLogging=function(e){return Object(S.a)(a,M)[M]=e,a},this.isPlaying=function(){return Object(S.a)(a,V)[V]},this.isPaused=function(){return Object(S.a)(a,K)[K]},this.playNotes=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"piano",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;Object(S.a)(a,V)[V]&&!Object(S.a)(a,K)[K]&&a.stop(),e&&0!==e.length?Object(S.a)(a,J)[J].has(t)?(Object(S.a)(a,F)[F]=e.slice(),e=new O.NoteArray(e).sortByTime(),Object(S.a)(a,B)[B]=e.getDuration(),n>0&&(e=e.filter((function(e){return e.start>=n})).shiftTime(-n),console.log("[Player] Will start at ".concat(n.toFixed(2)," seconds with ").concat(e.length()," notes left"))),1!==r&&r>0&&(e=e.scaleTime(1/r),Object(S.a)(a,B)[B]/=r),e=e.getNotes(),console.log("[Player] Playing ".concat(e.length," notes with '").concat(t,"', speed ").concat(r,", and volume ").concat(Object(S.a)(a,N)[N])),"suspended"===Object(S.a)(a,D)[D].state&&Object(S.a)(a,D)[D].resume(),Object(S.a)(a,z)[z]=t,Object(S.a)(a,A)[A]=n,Object(S.a)(a,E)[E]=i,Object(S.a)(a,I)[I]=r,Object(S.a)(a,U)[U]=e.slice(),t===Object(S.a)(a,G)[G]?a._start():a.preloadInstrument(t).then(a._start)):console.error("[Player] Sound ".concat(t," is not supported!")):console.warn("[PLAYER] Was called with no data")},this._start=function(){console.log("[Player] Starting"),Object(S.a)(a,V)[V]=!0,Object(S.a)(a,K)[K]=!1,Object(S.a)(a,L)[L]=Object(S.a)(a,D)[D].currentTime,a._scheduler()},this._updateTime=function(e){var t=(e-Object(S.a)(a,L)[L])*Object(S.a)(a,I)[I]+Object(S.a)(a,A)[A];a.currentPlayTime=t,Object(S.a)(a,R)[R]&&Object(S.a)(a,R)[R](t)},this._playNote=function(e,t){var n=e.getDuration();Object(S.a)(a,M)[M]&&console.log("[Player] Playing ".concat(e.getName()," for ").concat(n,"s"));try{Object(S.a)(a,H)[H].play(e.pitch,t,{duration:n})}catch(i){console.error("[Player] Error for note",e,i)}},this._scheduler=function(){var e=Object(S.a)(a,D)[D].currentTime;for(a._updateTime(e);Object(S.a)(a,U)[U].length>0;){var t=Object(S.a)(a,L)[L]+Object(S.a)(a,U)[U][0].start;if(t>e+.1)break;var n=Object(S.a)(a,U)[U].shift();a._playNote(n,t)}var i=e-Object(S.a)(a,L)[L]+Object(S.a)(a,A)[A],r=(Object(S.a)(a,E)[E]-Object(S.a)(a,A)[A])/Object(S.a)(a,I)[I]+Object(S.a)(a,A)[A];-1!==Object(S.a)(a,E)[E]&&i>=r||i>=Object(S.a)(a,B)[B]?a.stop():Object(S.a)(a,W)[W]=setTimeout(a._scheduler,33)},this.stop=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(Object(S.a)(a,V)[V])return console.log("[Player] Stopping player"),clearTimeout(Object(S.a)(a,W)[W]),a.currentPlayTime=null,Object(S.a)(a,V)[V]=!1,Object(S.a)(a,K)[K]=!1,Object(S.a)(a,F)[F]=[],Object(S.a)(a,U)[U]=[],Object(S.a)(a,R)[R]&&Object(S.a)(a,R)[R](null),e&&Object(S.a)(a,_)[_]&&Object(S.a)(a,_)[_](),a},this.pause=function(){return console.log("[Player] Pausing player"),clearTimeout(Object(S.a)(a,W)[W]),Object(S.a)(a,K)[K]=!0,a},this.resume=function(){if(console.log("[Player] Resuming player"),Object(S.a)(a,U)[U]&&0!==Object(S.a)(a,U)[U].length)return a.playNotes(Object(S.a)(a,F)[F],Object(S.a)(a,z)[z],a.currentPlayTime,Object(S.a)(a,E)[E],Object(S.a)(a,I)[I]),a;console.warn("[Player] Cannot resume player since it has not been started!")},this.pauseOrResume=function(){if(Object(S.a)(a,V)[V])return Object(S.a)(a,K)[K]?a.resume():a.pause(),a;console.warn("[Player] Cannot pause / resume when player is not playing!")},Object(S.a)(this,T)[T]=t}return Object(l.a)(e,[{key:"preloadInstrument",value:function(){var e=Object(x.a)(w.a.mark((function e(t){var a,n;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object(S.a)(this,J)[J].has(t)||console.warn("[Player] Invalid sound ".concat(t)),console.log("[Player] Loading soundfont ".concat(t)),a={soundfont:Object(S.a)(this,J)[J].get(t).font||"FluidR3_GM",gain:Object(S.a)(this,N)[N]},e.next=5,k.a.instrument(Object(S.a)(this,D)[D],t,a);case 5:n=e.sent,Object(S.a)(this,G)[G]=t,Object(S.a)(this,H)[H]=n,console.log("[Player] Finished loading soundfont ".concat(t));case 9:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),Y=a(70),Q=a.n(Y),X=function(e){Object(u.a)(a,e);var t=Object(b.a)(a);function a(e){var n;Object(s.a)(this,a);return(n=t.call(this,e,{top:35,right:20,bottom:40,left:55})).showExample=function(){n.textArea.value=n.example,n.setState({input:Object(h.a)(Object(h.a)({},n.state.input),{},{textInput:n.example})})},n.getNotes=function(){var e=n.state.input,t=e.midi,a=e.midiFileData,i=e.track,r=e.transpose,c=e.textInput,o=[];if(t)a.length-1>=i&&(o=a[i],0!==r&&(o=new O.NoteArray(o).transpose(r).getNotes()));else{var s=O.Lamellophone.convertNumbersToLetters(c,n.numberLetterMap);o=O.Lamellophone.convertTabToNotes(s,n.tuning,120)}return o},n.updateTab=function(){var e=n.state,t=e.output,a=e.notes,i=t.useHtml,r=t.letter;n.tab&&(i?n.tab.innerHTML=O.Lamellophone.convertNotesToHtmlTab(a,n.tuning,r?"letter":"number",.1,O.Utils.noteColorFromPitch):n.tab.innerText=O.Lamellophone.convertNotesToTab(a,n.tuning,r?"letter":"number",.1))},n.parseShareUrl=function(){var e,t=new URLSearchParams(window.location.search).get("notes");if(!t)return[];try{if(!(e=JSON.parse(t)))return[]}catch(a){return console.warn(a),console.log(t),[]}return new O.NoteArray(e).getNotes()},n.copyShareUrl=function(){var e=n.state.notes,t=encodeURI(JSON.stringify(e)),a=window.location.href.split("?")[0],i="".concat(a,"?notes=").concat(t);navigator.clipboard.writeText(i).then((function(){alert("Text copied to clipboard")})).catch((function(e){alert("Error in copying text: ",e)}))},n.play=function(){var e=n.state,t=e.playerSpeed,a=e.notes;n.player.playNotes(a,"kalimba",0,void 0,t)},n.pauseOrResume=function(){n.player.pauseOrResume()},n.stop=function(){n.player.stop()},n.state=Object(h.a)(Object(h.a)({},n.state),{},{input:{midi:!1,track:0,transpose:0,midiFileData:[],textInput:""},output:{useHtml:!0,letter:!0},notes:[],playerSpeed:1,currentPlayerTime:0}),n.tuning=O.Lamellophone.lamellophoneTunings.get("Kalimba").get("17 C Major"),n.numberLetterMap=new Map([[1,"C"],[2,"D"],[3,"E"],[4,"F"],[5,"G"],[6,"A"],[7,"B"]]),n.mounted=!1,n.player=(new q).onTimeChange((function(e){return n.setState({currentPlayerTime:e})})).setVolume(3),n.example="A B C a b c abc\n\n1 2 3\n\nC\xb0 C' C*\n\n(C E G)\n\n(C\xb0 E G)",n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.parseShareUrl();t&&t.length&&(console.log(t),this.setState({notes:t}));var a=document.getElementById("filereader");Q.a.parse(a,(function(t){try{var a=Object(O.preprocessMidiFileData)(t).parts.map((function(e){return e.noteObjs}));e.setState({input:Object(h.a)(Object(h.a)({},e.state.input),{},{midiFileData:a})})}catch(n){alert("Invalid MIDI file or wrong format!")}}))}},{key:"componentDidUpdate",value:function(e,t){if(this.state.input!==t.input){var a=this.getNotes();this.setState({notes:a})}}},{key:"render",value:function(){var e=this,t=this.state,a=t.input,i=t.output,r=t.notes,c=a.midi,o=a.midiFileData,s=a.transpose,l=i.useHtml,u=i.letter;return this.mounted?this.updateTab():this.mounted=!0,Object(n.jsxs)("div",{className:"View KalimbaTab",children:[Object(n.jsxs)("div",{className:"control",children:[Object(n.jsxs)("div",{children:[Object(n.jsxs)("label",{children:["Input:",Object(n.jsx)("button",{onClick:function(){return e.setState({notes:[],input:Object(h.a)(Object(h.a)({},a),{},{midi:!c})})},children:c?"MIDI":"Text"})]}),!c&&Object(n.jsx)("label",{children:Object(n.jsx)("button",{onClick:this.showExample,children:"Show example"})}),Object(n.jsxs)("div",{style:{display:c?"block":"none"},children:[Object(n.jsxs)("label",{children:["Open a MIDI file",Object(n.jsx)("input",{className:"fileInput",type:"file",id:"filereader",accept:".midi,.mid",style:{display:c?"inline-block":"none"}})]}),Object(n.jsxs)("label",{children:["Track:",Object(n.jsx)("select",{onChange:function(t){return e.setState({input:Object(h.a)(Object(h.a)({},a),{},{track:+t.target.value})})},disabled:0===o.length,children:o.map((function(e,t){return Object(n.jsxs)("option",{value:t,children:["Track ",t," (",e.length," notes)"]},t)}))})]}),Object(n.jsxs)("label",{children:["Transpose:",Object(n.jsx)("input",{type:"number",defaultValue:s,min:"-127",max:"127",step:"1",onChange:function(t){return e.setState({input:Object(h.a)(Object(h.a)({},a),{},{transpose:+t.target.value})})},disabled:0===o.length})]})]}),Object(n.jsx)("textarea",{ref:function(t){return e.textArea=t},style:{display:c?"none":"block"},placeholder:"Write or paste a kalimba tab in letter or number notation here",onChange:function(t){return e.setState({input:Object(h.a)(Object(h.a)({},a),{},{textInput:t.target.value})})}})]}),Object(n.jsxs)("div",{children:[Object(n.jsxs)("label",{children:["Output:",Object(n.jsx)("button",{onClick:function(){return e.setState({output:Object(h.a)(Object(h.a)({},i),{},{useHtml:!l})})},children:l?"Fancy":"Text"})]}),Object(n.jsxs)("label",{children:["Note symbols:",Object(n.jsx)("button",{onClick:function(){return e.setState({output:Object(h.a)(Object(h.a)({},i),{},{letter:!u})})},children:u?"Letter":"Number"})]})]}),Object(n.jsxs)("div",{children:["Player:",Object(n.jsx)("button",{onClick:this.play,children:"play"}),Object(n.jsx)("button",{onClick:this.pauseOrResume,children:"pause"}),Object(n.jsx)("button",{onClick:this.stop,children:"stop"}),Object(n.jsx)("input",{type:"number",min:"0.1",max:"2",defaultValue:"1",step:"0.1",onChange:function(t){return e.setState({playerSpeed:+t.target.value})}})]}),Object(n.jsx)("div",{children:Object(n.jsx)("button",{onClick:this.copyShareUrl,children:"Copy share URL"})})]}),Object(n.jsx)("div",{className:"tab",ref:function(t){return e.tab=t}}),Object(n.jsx)(f,{name:"Kalimba Roll",viewSize:{outerWidth:this.props.viewSize.outerWidth-60,outerHeight:800},tuning:this.tuning,data:r,currentPlayerTime:this.state.currentPlayerTime})]})}}]),a}(j),Z=a(71),$=function(e){Object(u.a)(a,e);var t=Object(b.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).onResize=function(){n.setState({viewSize:{outerWidth:Math.floor(window.innerWidth-20),outerHeight:Math.floor(window.innerHeight-200)}})},n.state={viewSize:{outerWidth:800,outerHeight:600},midiFileData:[],timeSelection:null},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.onResize,!1),this.onResize()}},{key:"render",value:function(){var e=this.state;return Object(n.jsxs)("div",{className:"App dark",children:[Object(n.jsx)(X,{viewSize:e.viewSize}),Object(n.jsx)("div",{className:"githubLink",children:Object(n.jsxs)("a",{href:"https://github.com/fheyen/kalimba",target:"blank",children:[Object(n.jsx)(d.a,{icon:Z.a}),"\xa0 https://github.com/fheyen/kalimba"]})})]})}}]),a}(i.Component);o.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)($,{})}),document.getElementById("root"))}},[[188,1,2]]]);
//# sourceMappingURL=main.89afcf82.chunk.js.map