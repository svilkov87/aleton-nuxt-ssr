<template>
	<header>
		<nav class="b-nav">
			<span class="b-nav__logo">{{ title }}</span>
			<span class="b-nav__text">{{ description }}</span>
			<ul class="b-nav__ul">
				<li v-if="this.$route.fullPath !==  '/' " class="b-nav__li b-nav__li_dropdown-link"
					@click="menuToggle()"
				>
					<span class="b-nav__span">
					услуги
					</span>
				</li>
				<li v-else class="b-nav__li"
					@click="menuToggle()"
				>
					<span class="b-nav__span">
					Контакты
					</span>
				</li>
			</ul>
		</nav>
		<section class="b-menu"
			v-bind:class="{ 'b-menu_active-toggle':activeMenu }"
		>
			<div class="b-container">
				<div class="b-menu__icon-close"
					@click="menuToggle()"
				>
					<i class="b-menu__close"></i>
				</div>
				<ul v-if="this.$route.fullPath !==  '/' "  class="b-menu__ul">
					<li  class="b-menu__li" 
						v-for="( menuItem ) in menuData()"
						:key="menuItem.text"
						v-bind:class="{ 'b-menu__li_fade-effect ':menuItem.isVisible }"
					>						
					<nuxt-link 
						:to="menuItem.url"
						exact-active-class="b-menu__active-link"
					>
						{{ menuItem.text }}
					</nuxt-link>
					</li>
				</ul>
				<ul v-else class="b-menu__ul">
					<li  class="b-menu__li_contacts">
						<span class="b-menu__contacts">Контакты</span>
						<ul class="b-menu__contacts-list">
							<li class="b-menu__contacts-list-items">603 070 г. Нижний Новгород</li>
							<li class="b-menu__contacts-list-items">Ул. Мануфактурная, 12</li>
							<li class="b-menu__contacts-list-items">+7 999 136 38 36</li>
							<li class="b-menu__contacts-list-items">+7 999 136 12 55</li>
						</ul>
					</li>
				</ul>
			</div>
		</section>
	</header>
</template>

<script>

export default {
	name: 'Navbar',
	data () {
		return {
			title: 'Алетон',
			description: 'Помощь в оформлении документов для иностранных граждан.',
			activeMenu: false,
			activeToggle: false,
			menuLists: [
				{
					text: 'Главная',
					dataFade: '300',
					url: '/',
					isActive: true,
					isVisible: false
				},
				{
					text: 'Патенты',
					dataFade: '500',
					url: '/patent',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Разрешение на временное проживание',
					dataFade: '700',
					url: '/rvp',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Вид на жительство',
					dataFade: '900',
					url: '/vnz',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Гражданство',
					dataFade: '1100',
					url: '/citizenship',
					isActive: false,
					isVisible: false
				},
			]
		}
	},
	methods: {
		menuToggle() {

			this.activeToggle = !this.activeToggle;
			this.activeMenu = !this.activeMenu;

			let arr = this.menuLists;

			arr.forEach( function( item ) {

				setTimeout( () => 
					item.isVisible = !item.isVisible
				, item.dataFade );

			} );

		},
		menuData() {
			// return this.$store.state.menuLists;
			return this.menuLists;
		}
		// classActive: function ( index ) {
		// 	this.$store.commit( 'classActive', index );
		// }
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
	display: flex;
	justify-content: space-between;
	background: $nav_bg;
	width: 100%;
	height: $nav_height;
	padding: 0 15px;
	@include desktop-1024 {
		height: 100px;
		line-height: 100px;
		padding: 0 50px;
	}
	&__logo {
		font-size: 18px;
		font-family: "Montserrat", sans-serif;
		font-weight: 600;
		text-transform: uppercase;
		pointer-events: auto;
		letter-spacing: 2px;
		z-index: $nav_zindex;
		line-height: $nav_height;
		transition: all $transition_default ease-in-out;
		&_active-logo{
			color: $nav_color_active;
		}
	}

	&__span {
		position: relative;
		letter-spacing: 2px;
		transition: all $transition_default ease-in-out;

		&:before {
			content: '';
			visibility: hidden;
			opacity: 0;
			border-radius: 50%;
			border: 1px solid #000;
			position: absolute;
			top: 5px;
			left: -10px;
			width: 10px;
			height: 10px;
		}
		&:after {
			content: '';
			visibility: hidden;
			opacity: 0;
			position: absolute;
			top: 10px;
			left: 10px;
			width: 2px;
			height: 1px;
			background: #000;
			transition: all $transition_default ease-in-out;
		}
		&_active-nav-span {
			color: $nav_color_active;
			&:after {
				content: '';
				visibility: visible;
				opacity: 1;
				position: absolute;
				width: 80px;
				background: $nav_color_active;
			}
			&:hover::after {
				width: 0;
			}
			&:before {
				border: 1px solid $nav_color_active;
			}
		}
	}

	&__text {
		letter-spacing: 2px;
		display: none;
		@include desktop-1024 {
			display: block;
		}
	}
	&__ul {
		display: flex;
		z-index: $nav_zindex;
	}
	&__li {
		position: relative;
		padding-left: 15px;
		line-height: $nav_height;
		transition: all $transition_default ease-in-out;
		cursor: pointer;

		&_dropdown-link {
			min-width: 100px;
			line-height: $nav_height;
			transition: all $transition_default ease-in-out;

			&:hover .b-nav__span {
				padding-left: 20px;
				&:before {
					visibility: visible;
					opacity: 1;
					animation: bubble $transition_default ease-in-out;
					@keyframes bubble {
						25% {
							transform: scale(2);
						}
						100% {
							transform: scale(.89);
						}
					}
				}
			}
		}
	}
}

.b-menu {
	position: fixed;
	top: -100%;
	left: 0;
	right: 0;
	height: 100vh;
	background: #1f1f1f;
	transition:  $transition_default cubic-bezier(.77,0, .175,1);

	&_active-toggle {
		top: 0;
		bottom: 0;
	}

	&__icon-close {
		cursor: pointer;
		width: 65px;
		height: 65px;
		top: 45px;
		right: 30px;
		position: absolute;
		@include desktop-1024 {
			right: 65px;

			&:hover .b-menu__close {
				&:before {
					top: 20px;
					transform: rotate(45deg);
				}
				&:after {
					transform: rotate(-45deg);
				}
			}
		}
	}

	&__close {
		display: block;
		overflow: visible;
		background: #fff;
		&:before {
			content: '';
			transform: rotate(45deg);
			background: #fff;
			width: 25px;
			position: absolute;
			top: 10px;
			height: 2px;
			@include desktop-1024 {
				width: 45px;
				transform: rotate(0);
				transition:  $transition_default cubic-bezier(.77,0, .175,1);
			}
		}
		&:after {
			content: '';
			transform: rotate(-45deg);
			background: #fff;
			width: 25px;
			position: absolute;
			top: 10px;
			height: 2px;
			@include desktop-1024 {
				width: 45px;
				transform: rotate(0);
				top: 23px;
				transition:  $transition_default cubic-bezier(.77,0, .175,1);
			}
		}
	}

	&__ul {
		padding-top: 140px;
		@include desktop-1024 {
			padding-top: 170px;
		}
	}

	&__contacts-list-items {
		color: #fff;
		line-height: 36px;
		letter-spacing: 2px;
		@include desktop-1024 {
			opacity: 0.8;
			line-height: 50px;
			font-size: 24px;
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

	&__contacts {
		width: 100%;
		color: #FFFFFF;
		cursor: pointer;
		display: block;
		font-family: "Montserrat", sans-serif;
		text-decoration: none;
		text-transform: uppercase;
		transition: all $transition_default ease-in-out;
		margin-bottom: 25px;
		@include desktop-1024 {
			opacity: 0.8;
			font-size: 24px;
			// font-size: 50px;
			line-height: 50px;
			letter-spacing: 6px;
			font-weight: 500;
		}
	}
}
</style>

