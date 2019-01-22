<template>
	<div class="b-slider"
		v-bind:class="{ 'b-slider_active-content ':this.$store.state.isShowContent }"
	>
		<div class="b-slider__bg"></div>
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
	visibility: hidden;
	// bottom: 0px;
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
		visibility: visible;
		top: 0;
		right: 0;
		height: 100vh;
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		bottom: 100px;
	}
	&__bg {
		@include desktop-1024 {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			// background: url("~assets/b-nav__bg_1.jpg") no-repeat;
			// background: url("~assets/bg.png") no-repeat;
			// background-size: cover;
			// filter: blur(3px);
		}
	}
	&_active-content {
		opacity: 1;
		visibility: visible;
		// bottom: 50px;
		top: 0;
	}
	&__grid-item {
		position: relative;
		width: 100%;
		// margin: 5px;
		padding-left: 50px;
		color: #000;
		text-transform: uppercase;
		font-weight: bold;
		line-height: 70px;
		&:before {
			content: '';
			position: absolute;
			width: 5px;
			height: 5px;
			top: 30px;
			left: 30px;
			border: 1px solid $nav_bg;
			border-radius: 50%;
		}
		
		@include desktop-1024 {
			color: #000;
			width: 50%;
			line-height: 70px;
			transition:  all .2s ease-in-out;
		}
		&:hover {
			@include desktop-1024 {
				background: #fff;
				color: #000;
				transform: scale(1.1);
				border-bottom: none; 
				box-shadow:  0px 0px 30px 10px rgba(0, 0, 0, 0.15);
			}
		}

		&_acrive-grid {
			color: #000;
			@include desktop-1024 {
				// background: #fff;
				color: #000;
				// color: #fff;
				border-bottom: 1px solid $nav_bg; 
				// border-bottom: 1px solid #fff; 
			}
			&:before {
				content: '';
				position: absolute;
				width: 9px;
				height: 9px;
				top: 30px;
				left: 28px;
				background: $nav_bg;
				border-radius: 50%;
				border: none;

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

