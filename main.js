Vue.component('product', {
	props:{
		premium:{
			type: Boolean,
			required: true
		}
	},
	template: `
	 <div class="product">
	   <div class="product-image">
		  <img v-bind:src="image">
		</div>

	   <div class="product-info">
			<h1>{{ title }}</h1>
			<p v-if="inStock">In stock</p>
			<p v-else-if="inventory<=5 && inventory > 0">Almost sold out</p>
			<p v-else :class="{outOfStock:!inStock}">Out of stock</p>
			
			<a :href="link" target="_blank">More products like this</a>
			<p> Shipping:{{ shipping }}</p>
			<ul> 
				<li v-for="detail in details">{{ detail }}</li>
			</ul>
			<div v-for="(variant, index) in variants" 
				:key="variant.variantId"
				class="color-box"
				:style="{ backgroundColor: variant.variantColor}"
				 @mouseover="updateProduct(index)">
				
			</div>
			<ul>
				<li v-for="size in sizes">{{ size }}</li>
			</ul>
			<button v-on:click="addToCart"
			:disabled="!inStock"
			:class="{disabledButton: !inStock }">Add to Cart</button>
			
		</div>
		<div>
			<h2>Reviews</h2>
			<p v-if="!reviews.length">There are no reviews yet.</p>
				<ul>
				<li v-for="review in reviews">
				<p>{{ review.name }}</p>
				<p>Rating: {{ review.rating}}</p>
				<p>{{ review.review}}</p>
				</li>
				</ul>
		</div>
		<product-review @review-submitted="addReview"></product-review>
	</div>
 	`,
data() {
 		return {	
 		  product: 'Socks',
		  brand: 'Nike',
		  selectedVariant: 0,		 
		  link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
 		inStock: true,
 		  details: ["80% cotton","20% polyester", "Gender-neutral"],
 		  variants:[
 			{
 			variantId: 2234,
 			variantColor:"green",
 			variantImage:"./sock.jpg",
 			variantQuantity: 10
 			},
 			{
 			variantId: 2235,
 			variantColor: " blue",
 			variantImage:"./blue socks.jpg",
 			variantQuantity: 0
 			}

 				],
 	
 		  sizes:[ "small", "meduim", "large", "extra-large"],
 		 reviews:[]
 		}
 },
 	methods: 
	 	{
 			addToCart: function () {
 				this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
 			},
 			updateProduct (index) {
 				this.selectedVariant = index
 			
 			},
 			addReview(productReview) {
 				this.reviews.push(productReview)
 			}
 			},
 	computed:{
 				title() {
 					return this.brand +' '+ this.product
 				},
 				image() {
 					return this.variants[this.selectedVariant].variantImage
 				},
 				inStock() {
 					return this.variants[this.selectedVariant].variantQuantity
 				},
 				shipping() {
 					if (this.premuim = true){
 						return "free"
 					}
 						return 2.99
 					
 				}
 			}
 	
})

Vue.component('product-review',{
	template: `
	<form class="review-form" @submit.prevent="onSubmit">
	<p v-if="errors.length">
	<b>Please correct the following error(s):</b>
	<ul>
	<li v-for="error in errors">{{ error }}</li>
	</ul>
	</p>

	<p>
	<label for="name">Name:</label>
	<input id="name" v-model="name">
	</p>
	<p>
	<label for="review">Review:</label>
	<textarea id="review" v-model="review"></textarea>
	</p>
	<p>
	  <label for="rating">Rating:</label>
	  <select id="rating" v-model.number="rating">
	  <option>5</option>
	  <option>4</option>
	  <option>3</option>
	  <option>2</option>
	  <option>1</option>
	  </select>
	  </p>
	  <p>
	  	<input type="submit" value="Submit">
	  	</p>
	  	</form>
	`,
	data() {
		return {
			name: null,
			review: null,
			rating: null,
			errors: []
		}
	},
	methods: {
		onSubmit(){
			if (this.name && this.review && this.rating) {
				let productReview = {
				name: this.name,
				review: this.review,
				rating: this.rating
			}
			this.$emit('review-submitted', productReview)
			this.name=null
			this.review = null
			this.rating = null
		}
		else {
			if(!this.name) this.errors.push("Name requied.")
				if(!this.review) this.errors.push("Review requied.")
					if(!this.rating) this.errors.push("Rating requied.")
			}
		}
			
	}
	
})

var app = new Vue({
	el: '#app',
	data:{
		premium: false,
		 cart: []
	},
	methods:{
		updateCart(id) {
			this.cart.push(id)
		}
	}

	})
