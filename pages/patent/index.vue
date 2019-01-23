<template>
	<div class="b-main-content" @wheel="wheel"
		v-bind:class="{'b-main-content_hide-bg': this.isContainerActive }"
	>
		<navbarpatent/>
		<div class="b-content-left"
			v-bind:class="{'b-content-left_tiny': this.isContainerActive }"
		>
			<div class="b-content-left__info-block">
				<nuxt-link to="/">
					<span class="b-content-left__logo">
					{{ title }}	
					</span>
				</nuxt-link>
				<h1 class="b-content-left__header">{{ subTitle }}</h1>
				<p class="b-content-left__need-docs">{{ description }}</p>
				<div class="b-content-left__wheel-arrows"
					v-bind:class="{'b-content-left__wheel-arrows_hide-wheel-arrows': this.isContainerActive }"
				>
				</div>
			</div>
		</div>
		<div class="b-content"
			v-bind:class="{'b-content_dominate': this.isContainerActive }">
			<div class="b-content__container"
				v-bind:class="{'b-content__container_active-container': this.isContainerActive }"
			>
			<h1 class="b-content__header">{{ subTitle }}</h1>
				
				<ul
					v-bind:class="[ !listBySlider ? {'b-content__list-right-scroll':  !listBySlider} : {'b-content__list':  listBySlider} ]"
				>
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
						<p class="b-content__list-item-title">
							<span>{{ index + 1 }}.</span>
							{{ item.title }}
						</p>
						<p
							v-if="item.description"
						 	class="b-content__list-item-description"
						>
							 {{ item.description }}
						 </p>
					</li>
				</ul>
				<div class="b-content__counter"
					v-bind:class="{'b-content__counter_hide-counter-block': this.isHideCounterBlock }"
				>
					{{ contentCounter + 1 }} / 20
				</div>
				<div class="b-content__arrows-wrapper"
					v-bind:class="{'b-content__arrows-wrapper_hide-arrows-wrapper': this.isHideArrows }"
				>
					<div class="b-content__arrow-up"
						@click="counterDown()"
					>
					</div>
					<div class="b-content__arrow-down"
						@click="counterUp()"
					>
					</div>
				</div>
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
					v-bind:class="{'b-content__view-switchers_hide-view-switchers': this.isHideViewSwitcher }"
					@click="changeContentView()"
				>
					<div class="b-content__view-popup">
						Показать полный вид списком
					</div>
				
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
				<div class="b-content__return-view"
					v-bind:class="{'b-content__return-view_show-return-view': this.returnSliderView }"
					@click="returnDefaultContentView()"
				>	
					<span class="b-content__return-view-span"></span>
					<div class="b-content__return-view-popup">Вернуть компактный вид</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navbarpatent from '~/components/Navbarpatent.vue'
import Copyright from '~/components/Copyright.vue'

export default {
	components: {
		Navbarpatent,
		Copyright
	},
	data () {
		return {
			title: 'Алетон',
			subTitle: 'Патенты',
			description: 'Для получения патента иностранный гражданин предоставляет следующие документы:',
			pos: 'крути',
			contentCounter: 0,
			needDocs: 'Для получения патента иностранный гражданин предоставляет следующие документы:',
			isHideViewSwitcher: false,
			isHideCounterBlock: false,
			isHideArrows: false,
			isContainerActive: false,
			returnSliderView: false,
			isHideCircles: false,
			listBySlider: true,
			contentArray: [
				{
					title: 'Заявление о выдаче патента',
					description: 'Написание заявления о выдаче патента на осуществление трудовой деятельности в РФ гражданам других государств проводится на территории любого субъекта Федерации. Основанием для этого служит контракт или трудовой договор граждан РФ с лицами, прибывшими в страну на законных основаниях в порядке безвизового въезда',
					isVisible: true,
					position: 0
				},
				{
					title: 'Фото 30*40',
					description: 'Фото должно быть в цветном исполнении',
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
		counterUp() {
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
		},
		counterDown() {
			this.contentCounter--

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
		},
		wheel (ev) {
			if (this.listBySlider) {
				if (ev.deltaY >  0) {
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
		},
		changeContentView() {
			this.isHideViewSwitcher = true
			// this.isHideCircles = true
			setTimeout( () => 
				this.isHideCounterBlock = true
			, 300 );
			setTimeout( () => 
				this.isHideArrows = true
			, 600 );
			setTimeout( () => 
				this.isContainerActive = true
			, 900 );
			setTimeout( () => 
				this.listBySlider = false
			, 900 );
			setTimeout( () => 
				this.returnSliderView = true
			, 1400 );

		},
		returnDefaultContentView() {

			setTimeout( () => 
				this.returnSliderView = false
			, 300 );

			setTimeout( () => 
				this.listBySlider = true
			, 400 );

			setTimeout( () => 
				this.isContainerActive = false
			, 600 );

			setTimeout( () => 
				this.isHideArrows = false
			, 900 );

			setTimeout( () => 
				this.isHideCounterBlock = false
			, 1200 );

			setTimeout( () => 
				this.isHideViewSwitcher = false
			, 1400 );

			setTimeout( () => 
				this.isHideCircles = false
			, 1600 );
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

.b-main-content {
	@include desktop-1024 {
		background-size: cover;
		height: 100vh;
		transition:  $transition_default ease-in;
	}
}
.b-content-left {
	display: none;
	@include desktop-1024 {
		position: absolute;
		top: 0;
		left: 0;
		width: 50%;
		height: 100vh;
		display: flex;
		justify-content: flex-end;
		background: $nav_bg;
		transition:  $transition_default ease-in;

		&_tiny {
			width: 40%;
		}
	}
	&__info-block {
		padding-top: $nav_desktop_indent;
		min-width: 430px;
		max-width: 430px;
		color: #d2d2d2;
	}
	&__logo {
		color: $nav_color;
		text-transform: uppercase;
		font-weight: bold;
		letter-spacing: 2px;
		display: block;
    		margin-bottom: 50px;
	}
	&__header {
		margin-bottom: 30px;
		letter-spacing: 2px;
	}
	&__need-docs {
		line-height: 25px;
		letter-spacing: 2px;
		@include desktop-1024 {
			width: 320px;
			margin-bottom: 50px;
		}
	}
	&__wheel-arrows {
		@include desktop-1024 {
			opacity: 1;
			visibility: visible;
			background: url("~assets/b-content-left__wheel-arrows.svg") no-repeat;
			height: 130px;
			width: 100px;
			transition:  $transition_default ease-in;
			&_hide-wheel-arrows {
				opacity: 0;
				visibility: hidden;
			}
		}
	}
}

.b-content {
	margin-top: 100px;
	@include desktop-1024 {
		padding: 0;
		margin-top: 0;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		transition:  $transition_default ease-in;
		&_dominate {
			width: 60%;
		}
	}
	&__container {
		position: relative;
		@include desktop-1024 {
			position: relative;
			margin-left: -50px;
			width: 652px;
			height: 475px;
			padding: 20px;
			background: #fff;
			box-shadow: 20px 10px 100px rgba(0, 0, 0, 0.25);
			transition:  $transition_default ease-in;
			&_active-container {
				padding: 150px 20px 0 20px;
				margin-left: 0;
				top: 0;
				right: 0;
   				width: 100%;
				height: 100vh;
			}
		}
	}
	&__counter {
		opacity: 0;
		visibility: hidden;
		@include desktop-1024 {
			opacity: 1;
			visibility: visible;
			position: absolute;
			line-height: 114px;
			text-align: center;
			width: 138px;
			height: 114px;
			left: -90px;
			bottom: 100px;
			background: #FFFFFF;
			box-shadow: 5px 20px 50px rgba(0, 0, 0, 0.25);
			transition:  $transition_default ease-in;
			&_hide-counter-block {
				opacity: 0;
				visibility: hidden;
				left: -120px;
			}
		}
	}
	&__arrows-wrapper {
		@include desktop-1024 {
			opacity: 1;
			visibility: visible;
			position: absolute;
			display: flex;
			flex-direction: column;
			width: 90px;
			height: 160px;
			right: -70px;
			top: 50px;
			background: #FFFFFF;
			box-shadow: 5px 20px 50px rgba(0, 0, 0, 0.25);
			transition:  $transition_default ease-in;
			&_hide-arrows-wrapper {
				opacity: 0;
				visibility: hidden;
				right:  0;
			}
		}
	}
	&__arrow-up {
		@include desktop-1024 {
			position: relative;
			cursor: pointer;
			width: 90px;
			height: 80px;
			background: #FFFFFF;
			&:before {
				content: '';
				position: absolute;
				top: 50%;
				left: 40%;
				width: 15px;
				height: 15px;
				transform: rotate(45deg);
				border-top: 1px solid;
				border-left:  1px solid;
				transition:  $transition_default ease-in;
			}
		}
	}
	&__arrow-down {
		@include desktop-1024 {
			position: relative;
			cursor: pointer;
			width: 90px;
			height: 80px;
			background: #FFFFFF;			
			&:before {
				content: '';
				position: absolute;
				bottom: 50%;
				left: 40%;
				width: 15px;
				height: 15px;
				transform: rotate(135deg);
				border-top: 1px solid;
				border-right:  1px solid;
				transition:  $transition_default ease-in;
			}
		}
	}
	&__view-switchers {
		@include desktop-1024 {
			opacity: 1;
			visibility: visible;
			display: flex;
			position: absolute;
			top: 0;
			right: 0;
			cursor: pointer;
			transition:  $transition_default ease-out;
			&:before {
				content: '';
				top: -23px;
				transform: rotate(-45deg);
				right: -32px;
				position: absolute;
				width: 0; height: 0;
				border-bottom: 10px solid transparent;
				border-right: 20px solid #03841c;
				border-top: 10px solid transparent;
				transition:  all $transition_default ease-out;
			}
			&_hide-view-switchers {
				top: -10px;
				opacity: 0;
				visibility: hidden;
				&:before {
					display: none;
				}
			}
			&:hover .b-content__view-popup{
				opacity: 1;
				visibility: visible;
			}
			&:hover {
				&:before {
					opacity: 0;
					visibility: hidden;
					right: -50px;
				}
			}
		}
	}
	&__view-popup {
		display: none;
		@include desktop-1024 {
			opacity: 0;
			visibility: hidden;
			// opacity: 1;
			// visibility: visible;
			padding: 20px;
			display: flex;
			position: absolute;
			top: -91px;
			left: -150px;
			background: #03841c;
			color: $nav_color;
			cursor: pointer;
			box-shadow: 5px 20px 50px rgba(0, 0, 0, 0.25);
			transition:  $transition_default ease-out;
			z-index: 999999;
			&:before {
				content: '';
				position: absolute;
				bottom: -10px;
				right: 32px;
				position: absolute;
				width: 0; height: 0;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 10px solid #03841c;
			}
		}
	}
	&__view-slider {
		@include desktop-1024 {
			display: none;
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
	&__return-view {
		display: none;
		@include desktop-1024 {
			display: block;
			cursor: pointer;
			position: absolute;
			top: 50%;
			left: -105px;
			opacity: 0;
			width: 120px;
			height: 80px;
			background: #FFFFFF;
			box-shadow: 5px 20px 50px rgba(0, 0, 0, 0.25);
			visibility: hidden;
			transition:  $transition_default ease-in;
			&:before {
				content: '';
				bottom: 20px;
				left: -32px;
				position: absolute;
				width: 0; height: 0;
				border-top: 10px solid transparent;
				border-left: 20px solid #ff4c00;
				border-bottom: 10px solid transparent;
				transition:  all $transition_default ease-out;
			}
			&:hover {
				&:before {
					opacity: 0;
					visibility: hidden;
					left: -45px;
				}
			}
			&_show-return-view {
				opacity: 1;
				visibility: visible;
				left: -95px;
			}
			&:hover .b-content__return-view-popup {
				opacity: 1;
				visibility: visible;
			}
			&:hover .b-content__return-view-span {
				&:before {
					left: 0;
				}
			}
		}
	}
	&__return-view-span {
			position: absolute;
			top: 35px;
			left: 35px;
			width: 50px;
			height: 2px;
			background: #000;
			transition:  $transition_default ease-in;
		&:before {
			content: '';
			position: absolute;
			top: 10px;
			left: 15px;
			width: 50px;
			height: 2px;
			background: #000;
			transition:  $transition_default ease-in;

		}
	}
	&__return-view-popup {
		display: none;
		@include desktop-1024 {
			display: block;
			opacity: 0;
			visibility: hidden;
			padding: 20px;
			display: flex;
			position: absolute;
			top: -85px;
			left: -150px;
			color: #fff;
			background: #ff4c00;
			cursor: pointer;
			box-shadow: 5px 20px 50px rgba(0, 0, 0, 0.25);
			transition:  $transition_default ease-out;
			&:before {
				content: '';
				bottom: -20px;
				right: 32px;
				position: absolute;
				width: 0; height: 0;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-top: 20px solid #ff4c00;;
				transition:  all $transition_default ease-out;
			}
		}

	}
	&__header {
		padding: 30px 0 30px 30px;
		@include desktop-1024 {
			display: none;
			padding: 0 0 30px 0;
		}
	}
	&__list {
		padding: 0 30px;
		@include desktop-1024 {
			margin-top: 30px;
			position: relative;
			min-height: 150px;
			max-height: 550px;
			// overflow-y: scroll;
		}
	}
	&__list-right-scroll {
		margin-top: 30px;
		padding: 0 30px;
		@include desktop-1024 {
			padding: 0;
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
		font-weight: bold;
		@include desktop-1024 {
			padding-left: 0;
			font-size: 26px;
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
		padding-top: 15px;
		padding-left: 10px;
		text-indent: 17px;
		transition:  $transition_default ease-in;
		&:before {
			content: '';
			position: absolute;
			top: 19px;
			left: 15px;
			width: 5px;
			height: 5px;
			border-radius: 50%;
			background: $nav_bg_mobile;
		}
		@include desktop-1024 {
			padding: 30px 0 30px 30px;
			width: 490px;
			text-align: justify;
			text-indent: 0;
			&:before {
				display: none;
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
			display: block;
			opacity: 1;
			visibility: visible;
			display: flex;
			position: absolute;
			bottom: 13px;
			left: 15px;
			transition:  $transition_default ease-in;
			&_hide-circle {
				// transform: translateY(40px);
				opacity: 0;
				visibility: hidden;
			}
		}
	}
	&__circle-item {
		border-radius: 50px;
		background: #ccc;
		margin-right: 15px;
		transition: all .5s;
		width: 4px;
		height: 4px;
		background: #FFFFFF;
		border: 1px solid #1F4866;
		box-sizing: border-box;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		&_show {
			position: relative;
			background: #9E0202;
			border: none;
			transform: scale(3);
			// &:after {
			// 	content: '';
			// 	position: absolute;
			// 	width: 15px;
			// 	height: 1px;
			// 	top: 4px;
			// 	right: -20px;
			// 	background: $nav_bg;
			// }
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
