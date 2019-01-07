<template>
	<header>
		<nav class="b-nav">
			<span class="b-nav__logo"
				v-bind:class="{ 'b-nav__logo_active-logo':activeToggle }"			
			>{{ title }}</span>
			<span class="b-nav__text">{{ description }}</span>
			<ul class="b-nav__ul">
				<li class="b-nav__li b-nav__li_dropdown-link"
					@click="menuToggle()"
				>
					<span class="b-nav__span"
						v-bind:class="{ 'b-nav__span_active-nav-span':     activeToggle }"
					>
					услуги
					</span>
				</li>
			</ul>
		</nav>
		<section class="b-menu"
			v-bind:class="{ 'b-menu_active-toggle':activeMenu }"
		>
			<div class="b-container">
				<ul class="b-menu__ul">
					<li class="b-menu__li"
						v-for="menuItem in menuData()"
						:key="menuItem.text"
						v-bind:class="{ 'b-menu__li_fade-effect ':menuItem.isVisible }"
					>	
					
					<nuxt-link :to="menuItem.text">
						{{ menuItem.text }}
					</nuxt-link>
					</li>
				</ul>
			</div>
		</section>
	</header>
</template>

<script>
// import Logo from '~/components/Logo.vue'

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
			// return this.activeToggle === true

			this.activeToggle = !this.activeToggle;
			this.activeMenu = !this.activeMenu;

			let arr = this.menuLists;

			arr.forEach(function( item ) {

				setTimeout( () => 
					item.isVisible = true
				, item.dataFade );

			} );

		},
		menuData() {
			return this.menuLists;
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
	display: flex;
	justify-content: space-between;
	background: $nav_bg;
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
	position: absolute;
	top: -100%;
	left: 0;
	right: 0;
	height: 100vh;
	background: #444444;
	transition: all $transition_default ease-in-out;

	&_active-toggle {
		top: 0;
	}

	&__ul {
		padding-top: 140px;
		@include desktop-1024 {
			padding-top: 170px;
		}
	}

	&__li {
		padding: 10px 0;
		opacity: 0;
		transition: all $transition_default ease-in-out;
		@include desktop-1024 {
			padding: 15px 0;
		}
		&_fade-effect {
			opacity: 1;
		}
		&_blur {
			filter: blur(2px);
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
	}

	&__li > a {
		width: 100%;
		color: #FFFFFF;
		display: block;
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
			// font-size: 50px;
			line-height: 50px;
			letter-spacing: 6px;
			font-weight: 500;
		}
	}
}
</style>

