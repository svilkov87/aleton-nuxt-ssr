<template>
	<div class="b-main" @wheel="wheel">
		<navbarpatent/>
		<div class="b-content">
			<div class="b-content__container">
				<h1 class="b-content__header">{{ title }}</h1>
				<p class="b-content__need-docs">{{ needDocs }}</p>
				<!-- <ul class="b-content__list"> -->
				<ul
					
					v-bind:class="[ !listBySlider ? {'b-content__list-right-scroll':  !listBySlider} : {'b-content__list':  listBySlider} ]"
				>
				<!-- v-bind:class="[{'b-content__list-right-scroll': !listBySlider } ]" -->
					<li 
						class="b-content__list-item"
						v-for="( item, index ) in contentData()"
						:key="item.title"
						v-bind:class="[ 
							listBySlider
							? { 'b-content__list-item_hide ': !item.isVisible } 
							: { 'b-content__list-item_column ': !listBySlider }
						]"
					>
					<!-- v-bind:class="{'b-content__list-item_hide': !item.isVisible }" -->
						<p class="b-content__list-item-title">
							<span>{{ index + 1 }}.</span>
							{{ item.title }}
						</p>
						<p
							v-if="item.description"
						 	class="b-content__list-item-description"
						>
							<!-- v-bind:class="{'b-content__list-item-description_hide-description': !listBySlider }" -->
							 {{ item.description }}
						 </p>
					</li>
				</ul>
				<div
					class="b-content__circle"
					v-bind:class="{'b-content__circle_hide-circle': !listBySlider }"
					>
					<div class="b-content__circle-item"
						v-for="( item, index ) in contentData()"
						:key="item.tiposition"
						v-bind:class="{'b-content__circle-item_show': item.isVisible }"
						@click="counterIndex( index )"
					>
					</div>
				</div>
				<div 
					class="b-content__view-switchers"
					@click="changeContentView()"
				>
					<div
						class="b-content__view-slider"
						v-bind:class="{'b-content__view-slider_disactive': !this.listBySlider }"
					>
						<span class="b-content__view-line"></span>
					</div>
					<div
						class="b-content__view-column"
						v-bind:class="{'b-content__view-column_active': !this.listBySlider }"
					>
						<span class="b-content__view-line b-content__view-line_type-columns"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navbarpatent from '~/components/Navbarpatent.vue'

export default {
	components: {
		Navbarpatent
	},
	data () {
		return {
			title: 'Патенты',
			pos: 'крути',
			contentCounter: 0,
			needDocs: 'Для получения патента иностранный гражданин предоставляет следующие документы:',
			listBySlider: false,
			contentArray: [
				{
					title: 'Фото 30*40',
					description: 'Фото должно быть в цветном исполнении',
					isVisible: true,
					position: 0
				},
				{
					title: 'Заявление о выдаче патента',
					description: '',
					isVisible: false,
					position: 1
				},
				{
					title: 'Документ, удостоверяющий личность данного иностранного гражданина и признаваемый Российской Федерацией в этом качестве',
					description: 'Очень часто это паспорт, военный билет или водительское удостоверение',
					isVisible: false,
					position: 2
				},
				{
					title: 'Полис ДМС/ договор',
					description: 'Действующий на территории Российской Федерации на срок осуществления трудовой деятельности данным иностранным гражданином договор ( полис ) добровольного медицинского страхования, заключенный со страховой организацией, созданной в соответствии с законодательством Российской Федерации, либо договор о предоставлении платных медицинских услуг, заключенный с медицинской организацией, находящейся в субъекте Российской Федерации, на на территории которого иностранный гражданин намеревается осуществить трудовую деятельность',
					isVisible: false,
					position: 3
				},
			],
		}
	},
	methods: {
		wheel (ev) {
			if (this.listBySlider) {
				if (ev.deltaY > 0) {
					this.pos = 'вверх' 
					console.log( this.pos )
					this.contentCounter++

					if( this.contentCounter >= this.contentArray.length - 1 ) {
					this.contentCounter = this.contentArray.length - 1
					}

					if ( this.contentCounter == this.contentArray[ this.contentCounter ].position  ){
					this.contentArray[ this.contentCounter ].isVisible = true
					} 
					if ( this.contentCounter - 1 == this.contentArray[ this.contentCounter - 1 ].position ) {
					this.contentArray[ this.contentCounter - 1 ].isVisible = false   
					}

				} 
				else {
					this.contentCounter--
					this.pos = 'вниз'
					console.log( this.pos )

					if( this.contentCounter <= 0 ) {
						this.contentCounter = 0
						this.contentArray[ this.contentCounter ].isVisible = true
					}

					if ( this.contentCounter == this.contentArray[ this.contentCounter ].position  ){
						this.contentArray[ this.contentCounter ].isVisible = true
					} 
					if ( this.contentCounter + 1 == this.contentArray[ this.contentCounter + 1 ].position ) {
						this.contentArray[ this.contentCounter + 1 ].isVisible = false   
					}
				}	
			}
		},
		contentData(){
			return this.contentArray
		},
		counterIndex( index ) {
			// console.log( index)
			// if ( index != this.contentCounter  ) {
			// 	this.contentCounter = index
			// 	this.contentArray[ index ].isVisible = true
			// }
		},
		changeContentView() {
			this.listBySlider = !this.listBySlider;
			console.log( this.listBySlider )
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

<style lang="scss">
@import "~/assets/sass/base/_variables.scss";
@import "~/assets/sass/base/_settings.scss";
@import "~/assets/sass/base/_mixins.scss";
@import "~/assets/sass/base/_variables.scss";

.b-content {
	margin-top: 100px;
	padding: 0 30px;
	@include desktop-1024 {
		margin-top: 150px;
		position: absolute;
		top: 0;
		right: 0;
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		transition:  $transition_default ease-in;
	}
	&__container {
		position: relative;
		max-width: 740px;
		// background: #ccc;
	}
	&__header {
		padding: 30px 0;
		@include desktop-1024 {
			padding: 0 0 30px 0;
		}
	}
	&__list {
		margin-top: 30px;
		@include desktop-1024 {
			position: relative;
			min-height: 150px;
			max-height: 550px;
			// overflow-y: scroll;
		}
	}
	&__list-right-scroll {
		margin-top: 30px;
		@include desktop-1024 {
			position: relative;
			min-height: 150px;
			max-height: 550px;
			overflow-y: scroll;

		}
	}
	&__list-item{
		padding: 15px 0;
		// padding: 15px;
		transition:  $transition_default ease-in;
		@include desktop-1024 {
			position: absolute;
			padding: 15px;
			top: 0;
			left: 0;
			&_hide {
				color: #fff;
				top: 30px;
				opacity: 0;
				visibility: hidden;
			}
			&_column {
				position: relative;
			}
		}
	}
	&__list-item-title {
		position: relative;
		padding-left: 15px;
		@include desktop-1024 {
			padding-left: 0;
			font-size: 26px;
			font-weight: bold;
		}
		&:before {
			content: '';
			position: absolute;
			top: 5px;
			left: 0;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: $nav_bg_mobile;
			@include desktop-1024 {
				display: none;
			}
		}
	}
	&__list-item-description {
		position: relative;
		padding: 15px 0 15px 45px;
		transition:  $transition_default ease-in;
		&:before {
			content: '';
			position: absolute;
			top: 21px;
			left: 30px;
			width: 5px;
			height: 5px;
			border-radius: 50%;
			background: $nav_bg_mobile;
		}
		@include desktop-1024 {
			padding: 30px 0 30px 30px;
			&:before {
				content: '';
				position: absolute;
				top: 34px;
				left: 15px;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background: $nav_bg_mobile;
			}
			&_hide-description {
				display: none;
			}
		}
	}
	&__circle {
		display: none; 
		@include desktop-1024 {
			opacity: 1;
			visibility: visible;
			display: flex;
			flex-direction: column;
			position: absolute;
			// justify-content: center;
			// height: 100%;
			top: 70px;
			right: -17px;
			transition:  $transition_default ease-in;
			&_hide-circle {
				transform: translateY(40px);
				opacity: 0;
				visibility: hidden;
			}
		}
	}
	&__circle-item {
		width: 10px;
		height: 10px;
		border-radius: 50px;
		background: #ccc;
		margin-right: 5px;
		margin-bottom: 5px;
		transition: all .5s;
		&_show {
			position: relative;
			background: $nav_bg;
			transform: scale(1.3);
			&:after {
				content: '';
				position: absolute;
				width: 15px;
				height: 1px;
				top: 4px;
				right: -20px;
				background: $nav_bg;
			}
		}
	}
	&__view-switchers {
		@include desktop-1024 {
			display: flex;
			position: absolute;
			top: 0;
			right: -80px;
			cursor: pointer;
			transition:  $transition_default ease-out;
		}
	}
	&__view-slider {
		@include desktop-1024 {
			position: relative;
			width: 40px;
			height: 40px;
			background: $nav_bg;
			transition:  $transition_default ease-out;
			&_disactive {
				background: #e0dfdf;
				span {
					background: $nav_bg;
				}
			}
		}
	}
	&__view-column {
		@include desktop-1024 {
			position: relative;
			width: 40px;
			height: 40px;
			background: #e0dfdf;
			transition:  $transition_default ease-out;
			&_active {
				background: $nav_bg;
				span {
					background: #fff;
					&:before {
						background: #fff;
					}
					&:after {
						background: #fff;
					}
				}
			}
		}
	}
	&__view-line {
		@include desktop-1024 {
			position: absolute;
			top: 19px;
			left: 10px;
			width: 19px;
			height: 2px;
			background: #fff;
			&_type-columns {
				top: 12px;
				background: $nav_bg;
				&:before {
					content: '';
					position: absolute;
					top: 8px;
					width: 19px;
					height: 2px;
					background: $nav_bg;
				}
				&:after {
					content: '';
					position: absolute;
					top: 16px;
					width: 19px;
					height: 2px;
					background: $nav_bg;
				}
			}
		}
	}
}

	::-webkit-scrollbar-button {
	// background-image:url('');
		background-repeat:no-repeat;
		width:2px;
		height:0px
	}

	::-webkit-scrollbar-track {
		background-color:#ecedee
	}

	::-webkit-scrollbar-thumb {
		-webkit-border-radius: 0px;
		border-radius: 0px;
		background-color:#ccc;
	}

	::-webkit-scrollbar-thumb:hover{
		background-color:#56999f;
	}

	::-webkit-resizer{
		// background-image:url('');
		background-repeat:no-repeat;
		width:2px;
		height:0px
	}

	::-webkit-scrollbar{
		width: 2px;
	}

</style>
