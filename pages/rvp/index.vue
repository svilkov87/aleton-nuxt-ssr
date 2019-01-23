<template>
	<div class="b-main">
		<navbar/>
		<mainslider/>
	</div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Mainslider from '~/components/Mainslider.vue'

export default {
	components: {
	// Logo,
		Navbar,
		Mainslider
	},
	data () {
		return {
			title: 'рвп'
		}
	},
	head () {
		return {
			title: this.title,
			meta: [
			// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{ 
					hid: 'description',
					name: 'рвп',
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
