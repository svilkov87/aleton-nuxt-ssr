<template>
  	<section class="container">
		<div>
			<navbar/>
		<!-- <logo/> -->
			<h1 class="title">
			aleton-nuxt-ssr
			</h1>
			<h2 class="subtitle">
			My mathematical Nuxt.js project
			</h2>
			<div class="links">
				<nuxt-link to="/patent">Патенты</nuxt-link>
			</div>
		</div>
	</section>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
	components: {
		Navbar
	},
	data () {
		return {
			title: 'Алетон | Помощь в оформлении документов для иностранных граждан'
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
