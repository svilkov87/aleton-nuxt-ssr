<template>
	<div class="b-main">
		<navbar/>
		<mainslider/>
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

</style>
