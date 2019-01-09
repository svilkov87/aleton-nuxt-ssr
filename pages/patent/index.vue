<template>
	<section class="container">
	<div>
		<navbar/>
		<h1 class="title">
		Patents page
		</h1>
		<h2 class="subtitle">
			This page about patents
		</h2>
		<div class="links">
			<nuxt-link to="/">Главная</nuxt-link>
		</div>
	</div>
	</section>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
	components: {
	// Logo,
		Navbar
	},
	data () {
		return {
			title: 'Патенты'
		}
	},
	head () {
		return {
			title: this.title,
			meta: [
			// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{ 
					hid: 'description',
					name: 'патенты',
					content: 'My custom description'
				 }
			]
		}
	}
}
</script>

<style>

.subtitle {
font-weight: 300;
font-size: 42px;
color: #526488;
word-spacing: 5px;
padding-bottom: 15px;
}

.links {
padding-top: 15px;
}
</style>
