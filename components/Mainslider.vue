<template>
	<div class="b-slider b-container"  @wheel="onScroll">
		<div class="b-slider__grid-item"
			v-for="item in getSliderData ()"
			:key="item.position"
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
	display: none;
	margin-top: 650px;
	&__grid-item {
		width: 50%;
		margin: 5px;
		background: #ccc;
		height: 300px;
		float: left;
	}
	// &__content-header {
	// 	margin-bottom: 25px;
	// 	text-transform: uppercase;
	// 	@include desktop-1024 {
	// 		font-size: 36px;
	// 	}
	// }
	// &__content-description {
	// 	color: #BB9C4A;
	// 	margin-bottom: 30px;
	// }
	// &__content-link {
	// 	color: #000;
	// }
}
</style>

