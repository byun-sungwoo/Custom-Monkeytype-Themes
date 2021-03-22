// ==UserScript==
// @name        galaxy
// @namespace   Violentmonkey Scripts
// @match       https://monkeytype.com/*
// @author      byun-sungwoo
// ==/UserScript==

(function() {
	let bodyTags = document.getElementsByTagName("body");
  
	let b = bodyTags[0];
  
	let videoContainer = document.createElement("div");
	videoContainer.id = "videoContainer";
  
	let vid =
	`
	<video autoplay muted loop id="myVideo">
	  <source src="https://byun-sungwoo.github.io/videos/space.webm" type="video/webm">
	</video>
	<div id="vidOverlay"></div>
	`;
  
	videoContainer.innerHTML = vid;
	
	// CSS
	var styles =
	`
	/* Variables */
	:root {
		/*Theme Colors*/
		--leaderboard-bg: rgba(81, 110, 145, .9);
		--frost-bg: rgba(255,255,255,.1);
		--text-primary: rgb(255, 255, 255);
		--text-secondary: rgb(200, 200, 200);
		--text-error: rgb(170, 116, 0);
		--text-caret: #195283;
		--error-underline-color: #F7665E;
  
		/*Font*/
		--font-family: 'Ghibli';
		--font-weight: bold;
  
		/*Other Details*/
		--border-radius: 12.5px;
		--padding: 15px;
		--card-backdrop: brightness(.8) blur(5px);
		--focused-backdrop: brightness(.8) blur(5px) saturate(.8);
		--logo-hover: drop-shadow(0 0 1rem rgba(255, 255, 255, .5));
		--error-intensity: 0.2;
		--top-animation-speed: .5s;
  
		/*Rain*/
		--rain-speed: .33s;
		--focus-fade-in: 1s;
		--rain-blur: 2px;
	}
  
	/* Background/Colors/Font */
	@font-face {
		font-family: 'Ghibli';
		src: url('https://byun-sungwoo.github.io/font/ghibli/Eyad%20Al-Samman%20-%20Ghibli.otf') format("opentype");
	}
	@font-face {
		font-family: 'Ghibli Bold';
		src: url('https://byun-sungwoo.github.io/font/ghibli/Eyad%20Al-Samman%20-%20Ghibli-Bold.otf') format("opentype");
	}
	body {
		background-color: black;
		font-family: var(--font-family);
		font-weight: var(--font-weight);
		--bg-color: var(--leaderboard-bg);
		--main-color: var(--text-primary);
		--caret-color: var(--text-caret);
		--sub-color: var(--text-secondary);
		--text-color: var(--text-primary);
		--error-color: var(--text-error);
		--error-extra-color: var(--text-error);
		--colorful-error-color: var(--text-error);
		--colorful-error-extra-color: var(--text-error);
	}
  
	/* Typing Transition */
	body:focus-within #vidOverlay {
		position: fixed;
		width: 100%;
		height: 100%;
		backdrop-filter: var(--focused-backdrop);
		transition: var(--focus-fade-in) ease-out;
	}
	body[style*="cursor: none"] #top.focus {
		animation: disappear var(--top-animation-speed) forwards ease-out;
	}
  
	/* Top Section */
	#top {
		grid-template-columns: 1fr auto 1fr;
		transition: transform var(--top-animation-speed) ease;
	}
	#top.focus {
		opacity: 0;
		transform: translateY(-25px);
	}
	#top .logo .top {
		visibility: hidden;
	}
	#top .logo .top:after {
		content: var(--font-family);
		visibility: visible;
		display: block;
	}
	#top .logo .bottom {
		visibility: hidden;
	}
	#top .logo .bottom:after {
		content: 'Galaxy';
		visibility: visible;
		display: block;
		margin-top: -30px;
	}
	#centerContent .focus {
		visibility: visible;
		opacity: 1;
	}
	#top .logo .bottom:hover {
		filter: var(--logo-hover);
	}
	#top .logo .bottom::after {
		color: var(--text-primary);
	}
	#top.focus #menu .icon-button {
		color: var(--text-secondary) !important;
	}
	#top.focus .config {
		opacity: 1 !important;
	}
	.icon-button.account.view-account .text {
		display: none;
	}
	#startTestButton {
		padding-left: 20px;
	}
	#menu {
		border-radius: 100px;
		width: 300px;
	}
	.config {
		border-radius: var(--border-radius);
		padding: calc(var(--padding) - 5px);
		width: 225px;
	}
	.signOut {
		border-radius: var(--border-radius);
		padding: var(--padding);
		width: 150px;
		text-align: center;
	}
	#menu:hover, .config:hover, .signOut:hover {
		background-color: var(--frost-bg);
		transition: 0.25s ease-in-out;
	}
  
	/* Middle Section */
	#middle {
		width: 1000px;
	}
  
	/* Bottom Section */
	#bottom, #bottom.focus {
		visibility: hidden;
	}
  
	/* Non Typing Pages */
	.content, .page.pageAbout.active, div.page.pageSettings.active {
		backdrop-filter: var(--card-backdrop);
		padding: var(--padding);
		border-radius: var(--border-radius);
	}
	div.page.pageSettings.active {
		width: 1000px;
		margin-top: 0px;
		margin-right: 100px;
		margin-bottom: 0px;
	}
	::-webkit-scrollbar {
		background: var(--leaderboard-bg);
	}
	i.fas.fa-fw.fa-spin.fa-circle-notch:before {
		color: white;
		filter: drop-shadow(0 0 1rem white);
	}
	.scrollToTopButton {
		display: none; /*hiding this bc it's positioned weird and I don't want to fix it.. o-o*/
	}
  
	/* Typing */
	#typingTest {
		padding-top: 250px;
	}
	#typingTest letter.incorrect  {
		animation: incorrect .25s forwards linear;
	}
	#wordsWrapper {
		border-radius: var(--border-radius);
	}
	.keymap {
		user-select: none;
		opacity: .75;
	}
	#result {
		width: 1000px;
		backdrop-filter: var(--card-backdrop);
		border-radius: var(--border-radius);
		padding: 50px;
  
		animation: fade-in .5s;
	}
	#wordsWrapper:hover {
		background-color: var(--frost-bg);
		cursor: pointer;
		transition: 0.25s ease-in-out;
	}
	.word.error {
		border-bottom: 2px solid var(--error-underline-color);
		text-shadow: none;
	}
  
	/* Animations */
	@keyframes incorrect {
		0%  { transform: scale(1);  }
		50% { transform: scale(calc(1 + var(--error-intensity)));}
		to  { transform: scale(1);  }
	}
	@keyframes fade-in {
		0%   { opacity: 0; }
		100% { opacity: 1; }
	}
	@keyframes subtle-fade-in {
		0%  { opacity: 0;   }
		to  { opacity: .25; }
	}
	@keyframes rain {
		0%  { background-position: 0% 0%;   }
		to  { background-position: 0% 100%  }
	}
	@keyframes focused {
		to  { backdrop-filter: var(--focused-backdrop); }
	}
	@keyframes disappear {
		0%  { opacity: 1; }
		to  { opacity: 0; filter:blur(10px); }
	}
  
	#myVideo {
		position: fixed;
		right: 0;
		bottom: 0;
		min-width: 100%;
		min-height: 100%;
		transform: translateX(calc((100% - 100vw) / 2)) translateY(calc((100% - 125vh) / 2));
	}
	`
  
	var styleSheet = document.createElement("style")
	styleSheet.type = "text/css"
	styleSheet.innerText = styles
	
	b.insertBefore(videoContainer, b.childNodes[0]);
	document.head.appendChild(styleSheet)
  })();