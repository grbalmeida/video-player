(function(){

	const video = document.querySelector('[data-video]')
	const player = document.querySelector('[data-player]')
	const icon = document.querySelector('[data-icon]')
	const currentTime = document.querySelector('[data-currenttime]')
	const progress = document.querySelector('[data-progress]')
	const mute = document.querySelector('[data-mute]')
	const volume = document.querySelector('[data-volume]')
	const currentTimeProgress = document.querySelector('[data-currenttime]')
	const currentAndDuration = document.querySelector('[data-currentduration]')
	const speed = document.querySelector('[data-speed]')

	icon.addEventListener('click', play)
	progress.addEventListener('click', changeCurrentTime)
	mute.addEventListener('click', zeroSound)
	volume.addEventListener('change', changeVolume)
	speed.addEventListener('click', changeVideoSpeed)

	function play() {
		setIcon(icon, 'fa-play', 'fa-pause', 'Play', 'Pause')
		playOrPause()
		changeVolume()
	}

	function setIcon(icon, firstClass, secondClass, firstTitle, secondTitle) {
		icon.classList.toggle(firstClass)
		icon.classList.toggle(secondClass)
		if(icon.getAttribute('title') == firstTitle) {
			icon.setAttribute('title', secondTitle)
		} else {
			icon.setAttribute('title', firstTitle)
		}
	}

	function playOrPause() {
		if(!icon.classList.contains('fa-play')) {
			video.play()
			changeInterval()
		} else {
			video.pause()
		}
	}

	function updateProgress() {
		currentTime.style.width = `${(video.currentTime / video.duration) * 100}%`
		checkCurrentTime()
		updateTime()
	}

	function changeCurrentTime(event) {
		video.currentTime = video.duration * (generatePercentage(progress) / 100)
		updateProgress()
	}

	function changeInterval() {
		const interval = setInterval(updateProgress, 1000)
	}

	function zeroSound() {
		setIcon(mute, 'fa-volume-up', 'fa-volume-off', 'Mute', 'Sound')
		if(mute.classList.contains('fa-volume-up')) {
			video.muted = false
		} else {
			video.muted = true
		}
	}

	function changeVolume() {
		video.volume = Number(volume.value) / 100
	}

	function generatePercentage(div) {
		const percentage = event.offsetX / ((div.offsetWidth) / 100)
		return percentage
	}

	function checkCurrentTime() {
		if(checkEqualityTime()) {
			video.currentTime = 0
			setIcon(icon, 'fa-play', 'fa-pause', 'Play', 'Pause')	
		}
	}

	function updateTime() {
		const current = new Date(video.currentTime * 1000)
		const duration = new Date(video.duration * 1000)
		const currentSeconds = formatDate(current.getSeconds())
		const currentMinutes = formatDate(current.getMinutes())
		const durationSeconds = formatDate(duration.getSeconds())
		const durationMinutes = formatDate(duration.getMinutes())
		currentAndDuration.textContent = `${currentMinutes}:${currentSeconds} - ${durationMinutes}:${durationSeconds}`
	}

	function formatDate(date) {
		return date < 10 ? `0${date}` : date
	}

	function checkEqualityTime() {
		return video.currentTime == video.duration
	}

	function changeVideoSpeed(event) {
		if(event.target.tagName == 'BUTTON') {
			video.playbackRate = Number(event.target.textContent.substring(0, 3))
		}
	}

})()