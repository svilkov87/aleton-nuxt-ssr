<template>
	<div class="b-slider"
		v-bind:class="{ 'b-slider_active-content ':this.$store.state.isShowContent }"
	>
		<div class="b-slider__bg"></div>
		<div class="b-slider__info-block">
			<div class="b-slider__wrapper">
				<nuxt-link 
					v-for="item in getSliderData ()"
					:key="item.position"
					:to="item.url"
					exact-active-class="b-slider__grid-item_acrive-grid"
					class="b-slider__grid-item"
				>
					{{ item.text }}
				</nuxt-link>
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
						text: 'Главная',
						advantages: 'Патенты для трудоустройства',
						url: '/',
						// position: 0,
						visible: true,
						buttonText: 'Перейти в раздел'
					},
					{
						text: 'Патенты',
						advantages: 'Патенты для трудоустройства',
						url: '/patent',
						position: 1,
						visible: true,
						buttonText: 'Перейти в раздел'
					},
					{
						text: 'РВП',
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
						text: 'Гражданство',
						advantages: 'Описание данной услуги с преимуществами',
						url: '/citizenship',
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
				// console.log( event )
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
	position: absolute;
	opacity: 0;
	// visibility: hidden;
	top: 40px;
	width: 100%;
	height: 650px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	transition: .5s ease-out;
	transition-delay: .5s;
	@include desktop-1024 {
		opacity: 1;
		// visibility: visible;
		top: 0;
		right: 0;
		height: 100vh;
		width: 50%;
		display: flex;
		align-items: flex-start;
		// align-items: center;
		bottom: 100px;
	}
	&__bg {
		@include desktop-1024 {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
	&_active-content {
		opacity: 1;
		visibility: visible;
		top: 0;
	}
	&__info-block {
		@include desktop-1024 {
			min-width: 430px;
			max-width: 430px;
			color: #d2d2d2;
		}
	}
	&__wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		@include desktop-1024 {
			margin-left: 100px;
		}
	}
	&__grid-item {
		position: relative;
		width: 100%;
		padding-left: 50px;
		color: #000;
		margin-bottom: 5px;
		text-transform: uppercase;
		font-weight: bold;
		line-height: 58px;
		&:before {
			content: '';
			position: absolute;
			width: 5px;
			height: 5px;
			top: 23px;
			left: 30px;
			border: 1px solid $nav_bg;
			border-radius: 50%;
			transition:  $transition_default ease-in;
			@include desktop-1024 {
				top: 15px;
			}
		}
		
		@include desktop-1024 {
			color: #000;
			line-height: 40px;
			transition:  all .2s ease-in-out;
		}
		&:hover {
			@include desktop-1024 {
				background: #fff;
				color: #000;
				border-bottom: none; 
				&:before {
					border: none;
					background: #000;
				}
			}
		}

		&_acrive-grid {
			color: #000;
			@include desktop-1024 {
				color: #000;
				transition:  $transition_default ease-in;
			}
			&:before {
				content: '';
				position: absolute;
				width: 9px;
				height: 9px;
				top: 22px;
				left: 28px;
				background: #03841c;
				border-radius: 50%;
				border: none;
				@include desktop-1024 {
					top: 15px;
				}
			}
		}
	}
	&__numbers {
		position: absolute;
		top: 0;
		left: 15px;
	}
}
</style>

