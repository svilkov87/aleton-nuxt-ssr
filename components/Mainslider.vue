<template>
	<div class="b-slider"  @wheel="onScroll">
		<div class="b-slider__wrapper b-container">
			<div class="b-slider__content-block">
				
				<div class="b-slider__fade-block"
					v-for="item in getSliderData ()"
					:key="item.position"
					:class="{'b-slider__fade-block_hide': !item.visible}"
				>
					<div class="b-slider__content-header">
						{{ item.text }}
					</div>
					<div class="b-slider__content-description">
						{{ item.advantages }}
					</div>
					<nuxt-link 
						:to="item.url"
						class="b-slider__content-link"
					>
						{{ item.buttonText }}
					</nuxt-link>
				</div>
			</div>
			<div class="b-slider__svg-block">
				<svg width="100%" height="100%" viewBox="0 0 42 42" class="b-slider__circle">
					<circle class="b-slider__hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
					<circle class="b-slider__ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#FFF" stroke-width="10"></circle>
					<circle class="b-slider__segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#F8F8F8" stroke-width="8" stroke-dasharray="40 20" stroke-dashoffset="0"></circle>
					  <g class="b-slider__counter">
						  <transition :duration="1000">
						<text x="50%" y="50%" class="b-slider__chart-number">
						{{ countPosition }}
						</text>
						</transition>
						<!-- <text x="50%" y="50%" class="b-slider__chart-label">
						Beers
						</text> -->
					</g>
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
				sliderData: [
					{
						text: 'Патенты для трудоустройства',
						advantages: 'Описание данной услуги с преимуществами',
						url: '/patent',
						position: 1,
						visible: true,
						buttonText: 'Перейти в раздел'
					},
					{
						text: 'Разрешение на временное проживание',
						advantages: 'Описание данной услуги с преимуществами',
						url: '/rvp',
						position: 2,
						visible: false,
						buttonText: 'Перейти в раздел'
					},
					{
						text: 'Вид на жительство',
						advantages: 'Описание данной услуги с преимуществами',
						url: '/vnz',
						position: 3,
						visible: false,
						buttonText: 'Перейти в раздел'
					},
					{
						text: 'Вид на жительство',
						advantages: 'Описание данной услуги с преимуществами',
						url: '/vnz',
						position: 4,
						visible: false,
						buttonText: 'Перейти в раздел'
					}	
				]
			}
		},
		methods: {
			getSliderData () {
				return this.sliderData;
			},
			onScroll( event ) {
				console.log( event )
			}
		},
		mounted() {
			window.addEventListener('scroll', this.onScroll);
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
			margin-top: 150px;
		// border: 1px solid #ccc;
		@include desktop-1024 {
			flex-direction: row;
			min-height: 485px;
			justify-content: center;
		}
	}
	&__content-block {
		position: relative;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		align-content: center;
	}
	&__fade-block {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		align-content: center;

		&_hide {
			position: absolute;
			bottom: 0;
			opacity: 0;
			visibility: hidden;
		}
	}
	&__content-header {
		margin-bottom: 25px;
		text-transform: uppercase;
		@include desktop-1024 {
			font-size: 36px;
		}
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
		justify-content: center;
		align-content: space-between;
		align-items: center;
		flex-direction: row;
		flex-flow: row wrap;
		align-content: center;
	}

	&__counter {
		// font: 16px/1.4em "Montserrat", Arial, sans-serif;
		font: 3px/1.4em "Montserrat", Arial, sans-serif;
		fill: #000;
		transform: translateY(0.25em);
	}
	&__chart-number {
		font-size: 0.6em;
		line-height: 1;
		text-anchor: middle;
		transform: translateY(-0.25em);
	}
	&__chart-label {
		font-size: 0.2em;
		text-transform: uppercase;
		text-anchor: middle;
		transform: translateY(0.7em);
	}

	&__circle {
		transition: all 0.5s ease-in-out;
		display: flex;	
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

