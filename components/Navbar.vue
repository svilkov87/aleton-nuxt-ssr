<template>
	<div>
		<div class="b-nav"
			v-bind:class="[ 
				this.isCompactMenu
				? {'b-nav_compact-menu ':this.isCompactMenu} 
				: { 'b-nav_down-menu ':this.isDownMenu }
			]"
		>
			<span class="b-nav__logo">{{ title }}</span>
			<span class="b-nav__span-hamburger"
				@click="toggleMenu()"
				v-bind:class="{ 'b-nav__span-hamburger_active-toggle ':this.isDownMenu }"
			>
				<span class="b-nav__span-lines"></span>
			</span>
			<div class="b-nav__info-wrapper"
				v-bind:class="[{ 'b-nav__info-wrapper_fade': !this.isShowInfo }]"
			>
				<p
					v-for=" item  in infoData()"
					:key="item.text"
					v-bind:class="[ { [item.fadeClass]: !item.isVisible }, item.defaultClass ]"
				>
					{{ item.title}}
				</p>
			</div>
			<div class="b-nav__service-button"
				@click="compactMenu()"
				v-bind:class="[
					this.isDownMenu
					? { 'b-nav__service-button_hide-button': this.isDownMenu }
					:  { 'b-nav__service-button_active-button': this.isCompactMenu }
				]"
			>
			</div>
			<div v-if="this.$route.fullPath !==  '/' "  
				class="b-nav__ul"
				v-bind:class="{ 'b-nav__ul_active-ul ':this.isShowList }"
			>
				<span  class="b-nav__li" 
					v-for="( menuItem ) in menuData()"
					:key="menuItem.text"
					v-bind:class="{ 'b-nav__li_fade-effect ':menuItem.isVisible }"
					@click="disactiveMenu()"
				>						
					<nuxt-link 
						:to="menuItem.url"
						exact-active-class="b-nav__active-link"
						@click="disactiveMenu()"
					>
						{{ menuItem.text }}
					</nuxt-link>
				</span>
			</div>
			<div v-else 
				class="b-nav__ul"
				v-bind:class="{ 'b-nav__ul_active-ul ':this.isShowList }"
			>
				<span class="b-nav__contacts-item b-nav__contacts-item_header">Контакты</span>
				<span class="b-nav__contacts-item">603 070 г. Нижний Новгород</span>
				<span class="b-nav__contacts-item">Ул. Мануфактурная, 12</span>
				<span class="b-nav__contacts-item">+7 999 136 38 36</span>
				<span class="b-nav__contacts-item">+7 999 136 12 55</span>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Navbar',
	data () {
		return {
			title: 'Алетон',
			downMenu: false,
			hamburgerToggle: false,
			counter: 0,
			fadeContacts: true,
			// 
			isDownMenu: false,
			isCompactMenu: false,
			isShowInfo: true,
			isShowList: false,
			// 
			fadeSettings: [
				{
					title: 'ПОМОЩЬ В ОФОРМЛЕНИИ ДОКУМЕНТОВ ДЛЯ ИНОСТРАННЫХ ГРАЖДАН',
					defaultClass: 'b-nav__text',
					fadeClass: 'b-nav__text_fade',
					isVisible: true,
					time: 200
				},
				{
					title: 'Работаем с физическими и юридическими лицами, за наличный и безналичный расчет',
					defaultClass: 'b-nav__cash-term',
					fadeClass: 'b-nav__cash-term_fade',
					isVisible: true,
					time: 300
				}
			],
			menuLists: [
				{
					text: 'Главная',
					dataFade: 600,
					url: '/',
					isActive: true,
					isVisible: false
				},
				{
					text: 'Патенты',
					dataFade: 700,
					url: '/patent',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Разрешение на временное проживание',
					dataFade: 800,
					url: '/rvp',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Вид на жительство',
					dataFade: 900,
					url: '/vnz',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Гражданство',
					dataFade:  1000,
					url: '/citizenship',
					isActive: false,
					isVisible: false
				},
			]
		}
	},
	methods: {
		toggleMenu() {
			this.counter++;
			this.$store.state.isShowContent = false
			this.hamburgerToggle = !this.hamburgerToggle;
			this.isCompactMenu = false;

			let arr = this.menuLists;
			arr.forEach( function( item ) {
				setTimeout( () => 
					item.isVisible = !item.isVisible
				, item.dataFade );
			} );

			if ( this.counter % 2 != 0 ) {
				
				console.log('не четное')
				// setTimeout( () => 
				this.isDownMenu = true
				// , 200 );
		
				this.isShowInfo = false

				setTimeout( () => 
					this.isShowList = true
				, 600 );


			} else {
				console.log(' четное')

				this.isShowList = false

				setTimeout( () => 
					this.isDownMenu = false
				, 400 );

				setTimeout( () => 
					this.isShowInfo = true
				, 800 );
			}

		},
		compactMenu() {
			this.counter = 2;
			this.isCompactMenu = true
			this.isShowInfo = false;
			this.isDownMenu = false;
			this.isShowList = false;
			this.$store.state.isShowContent = true
		},
		menuData() {
			return this.menuLists;
		},
		infoData() {
			return this.fadeSettings;
		},
		disactiveMenu() {
			this.downMenu = false;
			this.$store.state.isShowContent = false;
		}
	}
}
</script>

<style lang="scss">
@import "~/assets/sass/base/_variables.scss";
@import "~/assets/sass/base/_settings.scss";
@import "~/assets/sass/base/_mixins.scss";
@import "~/assets/sass/base/_variables.scss";

.b-nav {
	position: fixed;
	top: -120px;
	left: 0;
	width: 100%;
	height: 650px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: #730D56;
	transition:  $transition_default ease-in;
	z-index: 999;
	// transition-delay: 6s;
	@include desktop-1024 {
		top: -750px;
		height: 100vh;
		width: 100%;
		align-items: center;
		background: transparent;
	}
	&_down-menu {
		top: 0;
		bottom: 0;
		height: 100%;
		background: #000;
		align-items: center;
		z-index: 9999;
		// transition-delay: $transition_default;
		@include desktop-1024 {
			width: 100%;
			height: 100vh;
		}
	}
	&_compact-menu {
		top: -560px;
		background-image: none;
	}
	&__test-link {
		position: absolute;
		bottom: -95px;
		right: 25px;
		line-height: 65px;
	}
	&__logo {
		color: $nav_color;
		position: fixed;
		top: 35px;
		left: $indent_default;
		text-transform: uppercase;
		font-weight: bold;
		letter-spacing: 2px;
		@include desktop-1024 {
			display: none;
			top: $nav_desktop_indent;
			left: $nav_desktop_indent;
		}
	}	
	&__span-hamburger {
		position: fixed;
		display: flex;
    		justify-content: center;
		top: 33px;
		right: $indent_default;
		width: 30px;
		height: 20px;
		transform: rotate(90deg);
		transition:  $transition_default ease-out;
		@include desktop-1024 {
			display: none;
			cursor: pointer;
			top: $nav_desktop_indent;
			right: $nav_desktop_indent;
		}
		&_active-toggle{
			@include desktop-1024 {
				background: transparent;
				transform: rotate(0);
					.b-nav__span-lines {
						border-radius: 0%;
						width: 25px;
						height: 2px;
						background: #fff;
						&:before {
							border-radius: 0%;
							width: 25px;
							height: 2px;
							background: #fff;
						}
						&:after {
							border-radius: 0%;
							width: 25px;
							height: 2px;
							background: #fff;
						}
					}
			}
			
		}
	}
	&__span-lines {
		position: absolute;
		top: 0;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: #fff;
		@include desktop-1024 {
			background: $nav_bg;
		}
		&:before {
			content: '';
			position: absolute;
			top: 8px;
			width: 4px;
			height: 4px;
			border-radius: 50%;
			background: #fff;
			@include desktop-1024 {
				background: $nav_bg;
			}
		}
		&:after {
			content: '';
			position: absolute;
			top: 16px;
			width: 4px;
			height: 4px;
			border-radius: 50%;
			background: #fff;
			@include desktop-1024 {
				background: $nav_bg;
			}
		}
	}
	&__info-wrapper {
		transition:  all $transition_default ease-in-out;
		@include desktop-1024 {
			// opacity: 1;
			// visibility: visible;
			// position: fixed;
			// min-height: 450px;
			// left: $nav_desktop_indent;
			opacity: 1;
			visibility: visible;
			position: fixed;
			min-height: 450px;
			max-width: 550px;
			// padding-left: 25px;
			// box-shadow: 20px 10px 100px rgba(0, 0, 0, 0.25);
			left: 100px;
			// background: #4c5358;
			// transition:  .8s ease-out;
		}
		&_fade {
			opacity: 0;
			visibility: hidden;
		}
	}
	&__text {
		position: absolute;
		bottom: 200px;
		left: $indent_default;
		max-width: 330px;
		color: $nav_color;
		font-size: 24px;
		font-weight: bold;
		letter-spacing: 2px;
		transition: all $transition_default ease-in-out;
		@include desktop-1024 {
			position: static;
			color: #fff;
			transform: translateY(45px);
			max-width: 50%;
			// font-size: 48px;
		}
		&_fade {
			opacity: 0;
			bottom: 250px;
			@include desktop-1024 {
				transform: translateY(90px);				
			}
		}
	}
	&__cash-term {
		position: absolute;
		bottom: 105px;
		left: $indent_default;
		max-width: 330px;
		color: $nav_color;
		font-size: 18px;
		font-weight: bold;
		letter-spacing: 2px;
		transition: all $transition_default ease-in-out;
		@include desktop-1024 {
			color: #fff;
			opacity: .75;
			position: static;
			transform: translateY(70px);
		}
		&_fade {
			opacity: 0;
			bottom: 150px;
			@include desktop-1024 {
				transform: translateY(140px) !important;
			}
		}
	}
	&__service-button {
		height: 65px;
		width: 65px;
		position: absolute;
		right: 0;
		bottom: -35px;
		left: 0;
		margin: auto;
		overflow: auto; /*чтобы контент не расползался*/
		background: #fff;
		box-shadow: -5px 5px 40px rgba(0, 0, 0, 0.45);
		border-radius: 50%;
		transition: all $transition_default ease-in-out;
		@include desktop-1024 {
			display: none;
		}
		&_active-button {
			opacity: 0;
			transform: scale(2);
		}
		&_hide-button {
			display: none;
		}
	}
	&__ul {
		// position: absolute;
		// left: -425px;
		opacity: 0;
		visibility: hidden;
		// transform: translateX(-375px);
		max-width: 330px;
		display: flex;
		flex-direction: column;
		transition: all $transition_default ease-in-out;
		@include desktop-1024 {
			max-width: 100%;
			transform: translateY(-100px);
		}
		&_active-ul {
			opacity: 1;
			visibility: visible;
			transform: translateY(0);
			// left: $indent_default;
			// transform: translateX(-30px);
			@include desktop-1024 {
				position: static;
				transform: translateY(0);
				transform: translateX(0);
			}
		}
	}

	&__contacts-item {
		color: #fff;
		line-height: 36px;
		letter-spacing: 2px;
		@include desktop-1024 {
			opacity: 0.8;
			line-height: 50px;
			font-size: 24px;
		}
		&_header {
			font-weight: bold;
			font-size: 36px;
			margin-bottom: 25px;
		}
	}

	&__li {
		position: relative;
		padding: 10px 0;
		opacity: 0;
		transition: all $transition_default ease-in-out;
		@include desktop-1024 {
			line-height: 50px;
		}
		&_fade-effect {
			opacity: 1;
		}
		&_blur {
			filter: blur(2px);
		}
		&_contacts {
			opacity: 1;
		}
		&_active-menu-li {
			position: relative;
			padding-left: 35px;
			&:before {
				content: '';
				position: absolute;
				top: 15px;
				left: 0;
				width: 25px;
				height: 3px;
				background: #fff;
				@include desktop-1024 {
					top: 35px;
				}
			}

			a {
				color: #fff;
				opacity: 1 !important;
			}
		}

		&_active-menu-item{
			color: #fff;
		}

		&:before {
			content: '';
			opacity: 0;
			position: absolute;
			top: 32px;
			left: -15px;
			width: 5px;
			height: 5px;
			border-radius: 50%;
			background: #fff;
			transition: all $transition_default ease-in-out;
		}
		&:hover::before {
			opacity: 1;
		}
	}

	&__active-link {
		opacity: 1 !important;
		border-bottom: 2px solid red;
	}
	&__li > a {
		width: 100%;
		color: #FFFFFF;
		font-family: "Montserrat", sans-serif;
		text-decoration: none;
		text-transform: uppercase;
		transition: all $transition_default ease-in-out;
		&:hover {
			opacity: 1;
		}
		@include desktop-1024 {
			opacity: 0.45;
			font-size: 24px;
			padding-bottom: 10px;
			letter-spacing: 6px;
			font-weight: 500;
		}
	}
}
</style>

