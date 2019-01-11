<template>
  	<!-- <section class="container"> -->
		<div>
			<navbar/>
			<!-- <div class="links">
				<nuxt-link to="/patent">Патенты</nuxt-link>
			</div> -->
			<mainslider/>
		</div>
	<!-- </section> -->
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Mainslider from '~/components/Mainslider.vue'

export default {
	components: {
		Navbar,
		Mainslider
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
