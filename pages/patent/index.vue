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
				<ul class="b-content__list"
					v-bind:class="{'b-content__list_hide-content-list': !listBySlider}"
				>
					<li 
						class="b-content__list-item"
						v-for="( item, index ) in contentData()"
						:key="item.title"
                        v-bind:class="[ { 'b-content__list-item_opacity ': !item.isHidden } ]"
					>
						<p class="b-content__list-item-title">
							<span>{{ index + 1 }}.</span>
							{{ item.title }}
						</p>
						<div class="b-content__list-item-description-wrapper"
							v-bind:class="[ { 'b-content__list-item-description-wrapper_hide-list-item-description-wrapper': !item.isHidden } ]"
							>
							<p
								v-if="item.description"
								class="b-content__list-item-description"
								v-bind:class="[ 
									{ 'b-content__list-item-description_hide-list-item-description ': !item.isHidden } 
								]"
								
								>
								{{ item.description }}
							</p>
						</div>
					</li>
				</ul>
				<ul 					
					v-bind:class="[ 
						!listByDefault
						? {'b-content__list-default': !listByDefault} 
						: {'b-content__list-default_show-content-list-default': listByDefault } 
					]"
				>
					<li 
						class="b-content__list-item-default"
						v-for="( item, index ) in contentData()"
						:key="item.title"
					>
						<p class="b-content__list-item-title-default">
							<span>{{ index + 1 }}.</span>
							{{ item.title }}
						</p>
						<div class="b-content__list-item-description-wrapper-default"
							
							>
							<p
								v-if="item.description"
								class="b-content__list-item-description-default"
								
								>
								{{ item.description }}
							</p>
						</div>
					</li>
				</ul>
				<div class="b-content__counter"
                    v-bind:class="{'b-content__counter_hide-counter-block': this.isHideCounterBlock }"
                                        >
					{{ contentCounter  }} / {{ this.contentArray.length }}
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
						v-bind:class="{'b-content__circle-item_show': item.isHidden}"
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
            listByDefault: false,
			contentArray: [
				{
					title: 'Заявление о выдаче патента',
					description: 'Заполнение заявления о выдаче патента на осуществление трудовой деятельности в РФ гражданам других государств проводится на территории любого субъекта Федерации. Основанием для этого служит контракт или трудовой договор граждан РФ с лицами, прибывшими в страну на законных основаниях в порядке безвизового въезда',
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
					description: '... действующий на территории Российской Федерации на срок осуществления трудовой деятельности данным иностранным гражданином договор ( полис ) добровольного медицинского страхования, заключенный со страховой организацией, созданной в соответствии с законодательством Российской Федерации, либо договор о предоставлении платных медицинских услуг, заключенный с медицинской организацией, находящейся в субъекте Российской Федерации, на на территории которого иностранный гражданин намеревается осуществить трудовую деятельность',
					isVisible: false,
					position: 3
				},
				{
					title: 'Отсутсвие заболевания',
					description: 'Документы, подтверждающие отсутствие у данного иностранного гражданина заболевания наркоманией и выданные по результатам медицинского осмотра',
					isVisible: false,
					position: 4
				},
				{
					title: 'Документ об образовании',
					description: 'Документ государственного образца об образовании ( на уровне не ниже основного общего образования ), выданный образовательным учреждением на территории государства, входящего в состав СССР, до 1 сентября 1991 года',
					isVisible: false,
					position: 5
				},
				{
					title: 'Документ об образовании ( дополнительно )',
					description: 'Документ об образовании и ( или ) о квалификации, выданный лицам, успешно прошедшим итоговую аттестацию на территории Российской Федерации с 1 сентября 1991 года',
					isVisible: false,
					position: 6
				},
				{
					title: 'Документ о прохождении экзамена',
					description: '... на владение русским языком, знание истории и основ законодательства Российской Федерации',
					isVisible: false,
					position: 7
				}
			],
		}
	},
	methods: {
		counterUp() {
            let activeArray  = this.activeContentArray
			let defaultArray =  this.contentArray

			this.contentCounter++

			if(  this.contentCounter >= defaultArray.length ) {
				this.contentCounter = defaultArray.length 
			}  
			defaultArray[ this.contentCounter - 1 ].isHidden = true
			
		},
		counterDown() {
			let activeArray  = this.activeContentArray
			let defaultArray =  this.contentArray
			this.contentCounter--

			if(  this.contentCounter <= 0 ) {
				this.contentCounter = 0
			}
			defaultArray[ this.contentCounter ].isHidden = false
		},
		wheel (ev) {

            // let activeArray    = this.activeContentArray
			// let defaultArray =  this.contentArray

			// if ( this.listBySlider ) {
			// 	if ( ev.deltaY <  0 ) {

			// 		this.contentCounter++

			// 		if(  this.contentCounter >= defaultArray.length ) {
			// 		         this.contentCounter = defaultArray.length 
			// 		}  
			// 		defaultArray[ this.contentCounter - 1 ].isHidden = true
			// 	} 
			// 	else {		

			// 		this.contentCounter--

			// 		if(  this.contentCounter <= 0 ) {
			// 		         this.contentCounter = 0
			// 		}
			// 		defaultArray[ this.contentCounter ].isHidden = false

			// 	}	
			// }
		},
		contentData(){
			return this.contentArray
		},
		counterIndex( index ) {
		},
		changeContentView() {
			this.isHideViewSwitcher = true
			this.listBySlider = false
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
				this.returnSliderView = true
			, 1400 );
			setTimeout( () => 
				this.listByDefault = true
			, 1600 );

		},
		returnDefaultContentView() {

			this.listByDefault = false

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
		// position: absolute;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
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
                width: 230px;
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
			position: fixed;
			margin-left: -50px;
			width: 652px;
			// height: 640px;
			height: 100vh;
			background: #fff;
			box-shadow: 20px 10px 100px rgba(0, 0, 0, 0.25);
			transition:  $transition_default ease-in;
			&_active-container {
				// padding: 150px 20px 0 20px;
				margin-left: 0;
				// top: 0;
				// right: 0;
   				width: 60%;
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
			font-weight: bold;
			width: 114px;
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
			top: 190px;
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
			top: 130px;
			right: -25px;
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
				top: 115px;
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
			background: #7f828b;
			transition:  $transition_default ease-in;
		&:before {
			content: '';
			position: absolute;
			top: 10px;
			left: 15px;
			width: 50px;
			height: 2px;
			background: #7f828b;
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
			overflow-y: scroll;
			height: inherit;
			top: 100px;
			position: absolute;
			transition: $transition_default ease-in;
			padding-bottom: 165px;
			&_hide-content-list {
				opacity: 0;
				visibility: hidden;
				top: 140px;

			}
		}
	}
	&__list-default {
		display: none;
		@include desktop-1024 {
			opacity: 0;
			visibility: hidden;
			height: inherit;
			top: 100px;
			left: 35px;
			position: absolute;
			transition: $transition_default ease-in;
			&_show-content-list-default {
				opacity: 1;
				visibility: visible;
				position: absolute;
				overflow-y: scroll;
				height: inherit;
				top: 100px;
				left: 35px;
				padding-bottom: 165px;
				transition: $transition_default ease-in;
			}
		}	
	}
	&__list-right-scroll {
		margin-top: 30px;
		padding: 0 30px;
		@include desktop-1024 {
			// padding: 0;
			margin-top: 100px;
			position: relative;
			// min-height: 150px;
			// max-height: 550px;
			overflow-y: scroll;

		}
	}
	&__list-item{
		padding: 15px 0;
		transition:  1.5s  ease-in;
		@include desktop-1024 {
            position: relative;
			&_opacity {
                // filter: opacity(30%);
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
			width: 490px;
           	padding-left: 30px;
			transition:  all 1s ease-in;
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
	&__list-item-description-wrapper {
		@include desktop-1024 {
			max-height: 100em;
			overflow: hidden;
			// transition: max-height 1.2s;
			transition: all 1.2s ease-in-out;
			&_hide-list-item-description-wrapper {
				max-height: 0;
			}
		}
	}
	&__list-item-description {
		position: relative;
		padding-top: 15px;
		padding-left: 10px;
		text-indent: 17px;
		// transition:  $transition_default ease-in;
		transition:  all 1s ease-in;
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
			padding: 10px 30px 0 30px;
			// padding: 30px 0 30px 30px;
			width: 490px;
			line-height: 20px;
			font-size: 16px;
			color: #424141;
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
                        &_hide-list-item-description {
				// height: 0;
				// line-height: 0;
				// padding: 0;
				// transform: translateY(-45px);
                                opacity: 0;
                        }
			&_hide-description {
				display: none;
			}
		}
	}
	&__list-item-default{
		padding: 15px 0;
		transition: 1.5s ease-in;
		@include desktop-1024 {
            position: relative;
			margin-right: 80px;
		}
    }
	&__list-item-title-default {
		@include desktop-1024 {
			width: 550px;
           	padding-left: 30px;
			transition:  all 1s ease-in;
		}
	}
	&__list-item-description-wrapper-default {
		@include desktop-1024 {
			max-height: 100em;
			overflow: hidden;
			transition: all 1.2s ease-in-out;
			&_hide-list-item-description-wrapper {
				max-height: 0;
			}
		}
	}
	&__list-item-description-default {
		@include desktop-1024 {
			padding: 10px 30px 0 30px;
			width: 550px;
			line-height: 20px;
			font-size: 16px;
			color: #424141;
			text-indent: 0;
		}
	}
	&__circle {
		display: none; 
		@include desktop-1024 {
			display: block;
			opacity: 1;
			visibility: visible;
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 390px;
			right: 15px;
			transition:  $transition_default ease-in;
			&_hide-circle {
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
		margin-bottom: 10px;
		width: 15px;
		height: 15px;
		background: #FFFFFF;
		border: 1px solid #1F4866;
		box-sizing: border-box;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		&_show {
			position: relative;
			background: $nav_bg;
			border: none;
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
