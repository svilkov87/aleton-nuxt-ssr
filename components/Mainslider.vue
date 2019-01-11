<template>
	<div class="b-slider">
		<div class="b-slider__wrapper b-container">
			<div class="b-slider__content-block">
				<div class="b-slider__content-header">
					ПАТЕНТЫ ДЛЯ ТРУДОУСТРОЙСТВА
				</div>
				<div class="b-slider__content-description">
					Описание данной услуги с преимуществами
				</div>
				<a href="/patent" class="b-slider__content-link">перейти в раздел</a>
			</div>
			<div class="b-slider__svg-block">
				<svg width="100%" height="100%" viewBox="0 0 42 42" class="b-slider__circle">
					<circle class="b-slider__hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
					<circle class="b-slider__ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#FFF" stroke-width="10"></circle>
					<circle class="b-slider__segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#F8F8F8" stroke-width="8" stroke-dasharray="40 20" stroke-dashoffset="0"></circle>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Mainslider',
		data () {
			return {
				title: 'Slider',
				sliderData: [
					{
						text: 'Главная',
						dataFade: '300',
						url: '/',
						isActive: true,
						isVisible: false
					}
				]
			}
		},
		methods: {
			someMethod() {

			}
		}

	}
</script>

<style lang="scss">
@import "~/assets/sass/base/_variables.scss";
@import "~/assets/sass/base/_settings.scss";
@import "~/assets/sass/base/_mixins.scss";
@import "~/assets/sass/base/_variables.scss";

.b-slider {
	display: flex;
	justify-content: center;
	align-content: space-between;
	align-items: center;
	flex-direction: row;
	&__section {
		min-height: 550px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	&__wrapper {
		display: flex;
		flex-direction: column;
		// border: 1px solid #ccc;
		@include desktop-1024 {
			flex-direction: row;
			min-height: 485px;
			margin-top: 150px;
			justify-content: center;
		}
	}
	&__content-block {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		align-content: center;
		// display: flex;
		// align-content: center;
		// flex-flow: column;
		// height: 100%;
		// flex-direction: column;
	}
	&__content-header {
		font-size: 36px;
		margin-bottom: 25px;
	}
	&__content-description {
		color: #BB9C4A;
		margin-bottom: 30px;
	}
	&__content-link {
		color: #000;
	}
	&__svg-block {
		width: 100%;
	}

	&__circle {
		transition: all 0.5s ease-in-out;
	
		&:hover .b-slider__segment {
			stroke-dasharray: 20 5 40;
			stroke-width: 2;
		}
		&:hover .b-slider__ring {
			stroke-width: 1;
			opacity: 0;
		}
	}
	&__segment {
		transition: all 0.5s ease-in-out;
	}
	&__ring {
		transition: all 0.5s ease-in-out;
	}
}
</style>

