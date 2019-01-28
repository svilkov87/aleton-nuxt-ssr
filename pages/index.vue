<template>
	<div class="b-main">
		<navbar/>
		<mainslider/>
		<div class="b-content-left">
			<nuxt-link to="/">
				<span class="b-content-left__logo">
				{{ title }}	
				</span>
			</nuxt-link>
			<div class="b-content-left__info-block">
					<div class="b-content-left__contacts-close"
						@click="hideContacts()"
						v-bind:class="{'b-content-left__contacts-close_show-contacts-close': this.isShowContactsClose }"
					>
					</div>
				<div class="b-content-left__contacts-block"
					@click="showContacts()"
					v-bind:class="{'b-content-left__contacts-block_show-contacts-block': this.isShowContacts }"
				>
					<ul class="b-content-left__contacts-list"
						v-bind:class="{'b-content-left__contacts-list_show-contacts-list': this.isShowContactsList }"
					>
						<li class="b-content-left__contacts-list-item">603 070 г. Нижний Новгород</li>
						<li class="b-content-left__contacts-list-item">Ул. Мануфактурная, 12</li>
						<li class="b-content-left__contacts-list-item">+7 999 136 38 36</li>
						<li class="b-content-left__contacts-list-item">+7 999 136 12 55</li>
					</ul>
					<div class="b-content-left__contacts-popup">Показать контакты</div>
				</div>
				<div class="b-content-left__info-wrapper"
					v-bind:class="{'b-content-left__info-wrapper_move': this.moveRightInfoblock }"
				>
					
					<h1 class="b-content-left__header">{{ subTitle }}</h1>
					<p class="b-content-left__need-docs">{{ description }}</p>
				</div>
			</div>
		</div>
		<copyright/>
	</div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Mainslider from '~/components/Mainslider.vue'
import Copyright from '~/components/Copyright.vue'

export default {
	components: {
		Navbar,
		Mainslider,
		Copyright
	},
	data () {
		return {
			title: 'Алетон',
			subTitle: 'ПОМОЩЬ В ОФОРМЛЕНИИ ДОКУМЕНТОВ ДЛЯ ИНОСТРАННЫХ ГРАЖДАН',
			description: 'Работаем с физическими и юридическими лицами, за наличный и безналичный расчет',
			isShowContacts: false,
			moveRightInfoblock: false,
			isShowContactsList: false,
			isShowContactsClose: false
		}
	},
	methods: {
		showContacts() {
			this.isShowContacts = true
			this.moveRightInfoblock = true

			setTimeout( () => 
				this.isShowContactsList = true
			, 400 );

			setTimeout( () => 
				this.isShowContactsClose = true
			, 1000 );
		},
		hideContacts() {

			this.isShowContactsClose = false

			setTimeout( () => 
				this.isShowContactsList = false
			, 400 );

			setTimeout( () => 
				this.isShowContacts = false
			, 600 );

			setTimeout( () => 
				this.moveRightInfoblock = false
			, 600 );

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
		background: #052238;
		transform: translateX(40px);
		box-shadow: 20px 10px 100px rgba(0, 0, 0, 0.25);
		transition:  $transition_default ease-in;
		 z-index: 999999999;
		&_move {
			transform: translateX(230px);
			// transform: translateY(200px);
		}
	}
	&__info-block {
   		position: relative;
		padding-top: 185px;
		min-width: 430px;
		max-width: 430px;
		// margin-right: 50px;
		color: #d2d2d2;
	}
	&__contacts-block {
		@include desktop-1024 {
		display: none;
		cursor: pointer;
		position: absolute;
		top: 402px;
		left: -10px;
		height: 60px;
		min-width: 430px;
		background: #00ad68;
		box-shadow: 20px 10px 100px rgba(0, 0, 0, 0.25);
		transition:  $transition_default ease-in;
			&:before {
				content: '';
				bottom: -30px;
				left: -30px;
				position: absolute;
				width: 0; height: 0;
				border-top: 10px solid transparent;
				// border-left: 20px solid #ff4c00;
				border-left: 20px solid #fff;
				border-bottom: 10px solid transparent;
				transform: rotate(-43deg);
				transition:  all $transition_default ease-out;
			}
			&:hover .b-content-left__contacts-popup {
				opacity: 1;
				visibility: visible;
			}
			&:hover {
				&:before {
					opacity: 0;
					visibility: hidden;
					bottom: -30px;
				}
			}
		}
		&_show-contacts-block {
			top: 200px;
			width: 100px;
			height: 370px;
			transform: translateX(-97px);
			background:#0c6d46;
			&:before {
				opacity: 0;
			}
			&:hover .b-content-left__contacts-popup {
				opacity: 0;
				visibility: hidden;
			}
		}
	}
	&__contacts-close {
		cursor: pointer;
		opacity: 0;
		visibility: hidden;
		position: absolute;
		left: -120px;
		top: 400px;
		z-index: 9;
		width: 40px;
		height: 40px;
		background: #fff;
		transition:  $transition_default ease-in;
		&:before {
			content: '';
			position: absolute;
			top: 15px;
			left: 13px;
			width: 10px;
			height: 10px;
			border-left: 1px solid  #4c4c4c;
			border-top: 1px solid  #4c4c4c;
			transform: rotate( -45deg );
		}
		&_show-contacts-close {
			opacity: 1;
			visibility: visible;
			left: -125px;	
		}
	}
	&__contacts-popup {
		@include desktop-1024 {
			opacity: 0;
			visibility: hidden;
			position: absolute;
			color: #000;
			padding: 20px;
			top: -90px;
			left: -160px;
			background: #fff;
			box-shadow: 20px 10px 100px rgba(0, 0, 0, 0.25);
			transition:  all $transition_default ease-out;
			&:before {
				content: '';
				position: absolute;
				bottom: -10px;
				right: 14px;
				position: absolute;
				width: 0; height: 0;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 10px solid #fff;
			}
		}
	}
	&__contacts-list {
		opacity: 0;
		visibility: hidden;
		position: absolute;
		top: 20px;
		left: 40px;
		transition:  $transition_default ease-in;
		&_show-contacts-list {
			opacity: 1;
			visibility: visible;
			top: 40px;
		}
	}
	&__contacts-list-item {
		font-size: 20px;
		margin-bottom: 10px;
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
