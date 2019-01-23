<template>
        <div v-if="this.$route.fullPath ===  '/'"
                class="b-copyright"
                
        >
        <!-- v-bind:class="{ 'b-copyright__not-main ':this.$route.fullPath !==  '/' }" -->
                <span class="b-copyright__text">
                        {{ copyright }}
                </span>
        </div>
        <div v-else
                class="b-copyright_not-main"
        >
        <!-- v-bind:class="{ 'b-copyright__not-main ':this.$route.fullPath !==  '/' }" -->
                <span class="b-copyright__text">
                        {{ copyright }}
                </span>
        </div>
</template>

<script>
	export default {
		name: 'Copyright',
		data () {
			return {
                                copyright: 'Алетон 2019 (С)'
			}
		}
        }
</script>

<style lang="scss">
@import "~/assets/sass/base/_variables.scss";
@import "~/assets/sass/base/_settings.scss";
@import "~/assets/sass/base/_mixins.scss";
@import "~/assets/sass/base/_variables.scss";

.b-copyright {
        position: fixed;
        left: 30px;
        bottom: 15px;
        z-index: 999;
        @include desktop-1024 {
                left: 100px;
                bottom: 15px;
        }
        
        &_not-main {
                @include desktop-1024 {
                        position: absolute;
                        right:  15px;
                        bottom: 15px;
                }
        }
        &__text {
                opacity: .5;
                @include desktop-1024 {
                        
                        color: #fff;
                }
        }
}
</style>

