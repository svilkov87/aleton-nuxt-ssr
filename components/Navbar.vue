<template>
	<div class="b-main">
		<div class="b-nav"
			v-bind:class="{ 'b-nav_down-menu ':this.downMenu }"
		>
			<span class="b-nav__logo">{{ title }}</span>
			<span class="b-nav__span-hamburger"
				@click="menuToggle(), counterToggle()"
				v-bind:class="{ 'b-nav__span-hamburger_active-toggle ':this.hamburgerToggle }"
			>
				<span class="b-nav__span-lines"></span>
			</span>
			<div class="b-nav__info-wrapper">
				<p
					v-for=" item  in infoData()"
					:key="item.text"
					v-bind:class="[ { [item.fadeClass]: !item.isVisible }, item.defaultClass ]"
				>
					{{ item.title}}
				</p>
			</div>

			<!-- menuinfo -->

			<ul v-if="this.$route.fullPath !==  '/' "  
				class="b-nav__ul"
				v-bind:class="{ 'b-nav__ul_active-ul ':!this.fadeContacts }"
			>
				<li  class="b-nav__li" 
					v-for="( menuItem ) in menuData()"
					:key="menuItem.text"
					v-bind:class="{ 'b-nav__li_fade-effect ':menuItem.isVisible }"
				>						
					<nuxt-link 
						:to="menuItem.url"
						exact-active-class="b-nav__active-link"
					>
						{{ menuItem.text }}
					</nuxt-link>
				</li>
			</ul>
			<div v-else 
				class="b-nav__ul"
				v-bind:class="{ 'b-nav__ul_active-ul ':!this.fadeContacts }"
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
			fadeSettings: [
				{
					title: 'ПОМОЩЬ В ОФОРМЛЕНИИ ДОКУМЕНТОВ ДЛЯ ИНОСТРАННЫХ ГРАЖДАН',
					defaultClass: 'b-nav__text',
					fadeClass: 'b-nav__text_fade',
					isVisible: true,
					time: 200
				},
				{
					title: 'Работаем с физическими лицами, по безналичному расчету',
					defaultClass: 'b-nav__cash-term',
					fadeClass: 'b-nav__cash-term_fade',
					isVisible: true,
					time: 300
				}
			],
			menuLists: [
				{
					text: 'Главная',
					dataFade: 1500,
					url: '/',
					isActive: true,
					isVisible: false
				},
				{
					text: 'Патенты',
					dataFade: 1600,
					url: '/patent',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Разрешение на временное проживание',
					dataFade: 1700,
					url: '/rvp',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Вид на жительство',
					dataFade: 1800,
					url: '/vnz',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Гражданство',
					dataFade:  1900,
					url: '/citizenship',
					isActive: false,
					isVisible: false
				},
			]
		}
	},
	methods: {
		counterToggle(){
			this.counter++;
			        if ( this.counter % 2 == 0) {
					console.log('четное')
					this.fadeContacts = true
					this.hamburgerToggle = false
					
					
				}
				else {
					console.log('не четное')
					
					setTimeout( () => 
						this.fadeContacts = false
					, 1000 );
					setTimeout( () => 
						this.hamburgerToggle = true
					, 1000 );
				}
		},
		menuToggle() {
			
			setTimeout( () => 
				this.downMenu = !this.downMenu
			, 600 );

			let arr = this.menuLists;
			arr.forEach( function( item ) {
				setTimeout( () => 
					item.isVisible = !item.isVisible
				, item.dataFade );
			} );

			let arr2 = this.fadeSettings;
			arr2.forEach( function( item ) {
				setTimeout( () => 
				item.isVisible = !item.isVisible
				, item.time );
			} );

		},
		menuData() {
			return this.menuLists;
		},
		infoData() {
			return this.fadeSettings;
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

.b-nav {
	position: absolute;
	top: -250px;
	left: 0;
	width: 100%;
	height: 650px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: #3C81B3;
	transition:  $transition_default ease-out;
	transition-delay: 0s;
	@include desktop-1024 {
		top: 0;
		height: 100vh;
		width: 50%;
		align-items: center;
	}
	&_down-menu {
		top: 0;
		bottom: 0;
		height: 100%;
		background: #000;
		align-items: center;
		transition-delay: $transition_default;
		@include desktop-1024 {
			width: 100%;
			height: 100vh;
		}
	}
	&__logo {
		color: $nav_color;
		position: fixed;
		top: 35px;
		left: 15px;
		text-transform: uppercase;
		font-weight: bold;
		letter-spacing: 2px;
		@include desktop-1024 {
			top: $nav_desktop_indent;
			left: $nav_desktop_indent;
		}
	}
	
	&__span-hamburger {
		position: fixed;
		display: flex;
    		justify-content: center;
		top: 33px;
		right: 20px;
		width: 30px;
		height: 20px;
		// border: 1px solid #ccc;
		transform: rotate(90deg);
		transition:  $transition_default ease-out;
		@include desktop-1024 {
			cursor: pointer;
			position: absolute;
			top: 147px;
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
						&:before {
							border-radius: 0%;
							width: 25px;
							height: 2px;
						}
						&:after {
							border-radius: 0%;
							width: 25px;
							height: 2px;
						}
					}
			}
			
		}
	}
	&__span-lines {
		position: absolute;
		top: 0;
		// width: 30px;
		// height: 2px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: $nav_color;
		&:before {
			content: '';
			position: absolute;
			top: 8px;
			width: 4px;
			height: 4px;
			border-radius: 50%;
			background: $nav_color;
		}
		&:after {
			content: '';
			position: absolute;
			top: 16px;
			width: 4px;
			height: 4px;
			border-radius: 50%;
			background: $nav_color;
		}
		@include desktop-1024 {
		}
	}
	&__info-wrapper {
		@include desktop-1024 {
			position: fixed;
			min-height: 450px;
			left: $nav_desktop_indent;
		}
	}
	&__text {
		position: absolute;
		bottom: 150px;
		left: 15px;
		max-width: 330px;
		color: $nav_color;
		font-size: 24px;
		font-weight: bold;
		letter-spacing: 2px;
		transition: all $transition_default ease-in-out;
		@include desktop-1024 {
			position: static;
			transform: translateY(45px);
			font-size: 48px;
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
		bottom: 65px;
		left: 15px;
		max-width: 330px;
		color: $nav_color;
		font-size: 18px;
		font-weight: bold;
		letter-spacing: 2px;
		transition: all $transition_default ease-in-out;
		@include desktop-1024 {
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
	&__ul {
		opacity: 0;
		visibility: hidden;
		transform: translateX(-375px);
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
			transform: translateY(15px);
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

