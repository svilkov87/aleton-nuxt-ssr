<template>
	<div class="b-main">
		<navbar/>
		<div class="b-content-left">
			<nuxt-link to="/">
				<span class="b-content-left__logo">
				{{ title }}	
				</span>
			</nuxt-link>
			<div class="b-content-left__info-block">
				<div class="b-content-left__info-wrapper">
					<h1 class="b-content-left__header">{{ subTitle }}</h1>
					<p class="b-content-left__need-docs">{{ description }}</p>
				</div>
			</div>
		</div>
		<!-- <navbarpatent/> -->
		<mainslider/>
		<copyright/>
	</div>
</template>

<script>
// import Navbarpatent from '~/components/Navbarpatent.vue'
import Navbar from '~/components/Navbar.vue'
import Mainslider from '~/components/Mainslider.vue'
import Copyright from '~/components/Copyright.vue'

export default {
	components: {
		// Navbarpatent,
		Navbar,
		Mainslider,
		Copyright
	},
	data () {
		return {
			title: 'Алетон',
			subTitle: 'ПОМОЩЬ В ОФОРМЛЕНИИ ДОКУМЕНТОВ ДЛЯ ИНОСТРАННЫХ ГРАЖДАН',
			description: 'Работаем с физическими лицами, по безналичному расчету',
		}
	},
 	head () {
		return {
			title: this.title,
			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{ hid: 'description', name: 'description', content: 'My custom description' }
			]
		}
	}
}
</script>

<style lang="scss">
@import "~/assets/sass/base/_variables.scss";
@import "~/assets/sass/base/_settings.scss";
@import "~/assets/sass/base/_mixins.scss";
@import "~/assets/sass/base/_variables.scss";

.b-main {
	@include desktop-1024 {
		display: flex;
	}
}
.b-content-left {
	display: none;
	@include desktop-1024 {
		position: absolute;
		top: 0;
		left: 0;
		width: 50%;
		height: 100vh;
		display: flex;
		// flex-direction: column;
		justify-content: flex-end;
		background: $nav_bg;
		transition:  $transition_default ease-in;

		&_tiny {
			width: 40%;
			// background: #3c0d0d;
		}
	}
	&__logo {
		position: absolute;
		top: 100px;
		color: $nav_color;
		text-transform: uppercase;
		font-weight: bold;
		letter-spacing: 2px;
		display: block;
    		margin-bottom: 50px;
	}
	&__info-wrapper {
		padding: 20px;
		background: #072840;
		transform: translateX(40px);
		box-shadow: 20px 10px 100px rgba(0, 0, 0, 0.25);
	}
	&__info-block {
		padding-top: 185px;
		min-width: 430px;
		max-width: 430px;
		// margin-right: 50px;
		color: #d2d2d2;
	}
	&__header {
		margin-bottom: 30px;
		letter-spacing: 2px;
	}
	&__need-docs {
		line-height: 25px;
		letter-spacing: 2px;
		@include desktop-1024 {
			width: 320px;
			margin-bottom: 50px;
		}
	}
	&__wheel-arrows {
		@include desktop-1024 {
			opacity: 1;
			visibility: visible;
			background: url("~assets/b-content-left__wheel-arrows.svg") no-repeat;
			height: 130px;
			width: 100px;
			transition:  $transition_default ease-in;
			&_hide-wheel-arrows {
				opacity: 0;
				visibility: hidden;
			}
		}
	}
}

</style>
