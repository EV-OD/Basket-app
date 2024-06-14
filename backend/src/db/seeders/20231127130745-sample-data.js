const db = require('../models');
const Users = db.users;

const Deliveries = db.deliveries;

const Orders = db.orders;

const Products = db.products;

const Reviews = db.reviews;

const Subscriptions = db.subscriptions;

const DeliveriesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    pickup_date: new Date('2023-10-01T15:00:00Z'),

    delivery_date: new Date('2023-10-01T17:00:00Z'),

    proof_of_delivery: true,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    pickup_date: new Date('2023-10-02T15:00:00Z'),

    delivery_date: new Date('2023-10-02T17:00:00Z'),

    proof_of_delivery: true,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    pickup_date: new Date('2023-10-03T15:00:00Z'),

    delivery_date: new Date('2023-10-03T17:00:00Z'),

    proof_of_delivery: true,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    pickup_date: new Date('2023-10-04T15:00:00Z'),

    delivery_date: new Date('2023-10-04T17:00:00Z'),

    proof_of_delivery: true,
  },
];

const OrdersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    order_date: new Date('2023-10-01T10:00:00Z'),

    status: 'completed',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    order_date: new Date('2023-10-02T11:00:00Z'),

    status: 'cancelled',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    order_date: new Date('2023-10-03T12:00:00Z'),

    status: 'completed',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    order_date: new Date('2023-10-04T13:00:00Z'),

    status: 'pending',
  },
];

const ProductsData = [
  {
    name: 'Organic Apples',

    description: 'Freshly picked organic apples.',

    price: 3.99,

    // type code here for "relation_one" field
  },

  {
    name: 'Carrots',

    description: 'Crunchy and sweet carrots.',

    price: 2.49,

    // type code here for "relation_one" field
  },

  {
    name: 'Tomatoes',

    description: 'Juicy and ripe tomatoes.',

    price: 4.99,

    // type code here for "relation_one" field
  },

  {
    name: 'Lettuce',

    description: 'Crisp and fresh lettuce.',

    price: 1.99,

    // type code here for "relation_one" field
  },
];

const ReviewsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    content: 'Great apples, very fresh!',

    rating: 5,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    content: 'Carrots were a bit small.',

    rating: 3,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    content: 'Tomatoes were perfect.',

    rating: 4,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    content: 'Lettuce was crisp and fresh.',

    rating: 5,
  },
];

const SubscriptionsData = [
  {
    // type code here for "relation_one" field

    frequency: 'weekly',

    start_date: new Date('2023-10-01T00:00:00Z'),

    end_date: new Date('2023-12-01T00:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    frequency: 'monthly',

    start_date: new Date('2023-10-01T00:00:00Z'),

    end_date: new Date('2024-10-01T00:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    frequency: 'monthly',

    start_date: new Date('2023-11-01T00:00:00Z'),

    end_date: new Date('2024-01-01T00:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    frequency: 'monthly',

    start_date: new Date('2023-12-01T00:00:00Z'),

    end_date: new Date('2024-12-01T00:00:00Z'),
  },
];

// Similar logic for "relation_many"

async function associateDeliveryWithOrder() {
  const relatedOrder0 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Delivery0 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Delivery0?.setOrder) {
    await Delivery0.setOrder(relatedOrder0);
  }

  const relatedOrder1 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Delivery1 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Delivery1?.setOrder) {
    await Delivery1.setOrder(relatedOrder1);
  }

  const relatedOrder2 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Delivery2 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Delivery2?.setOrder) {
    await Delivery2.setOrder(relatedOrder2);
  }

  const relatedOrder3 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Delivery3 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Delivery3?.setOrder) {
    await Delivery3.setOrder(relatedOrder3);
  }
}

async function associateDeliveryWithDelivery_personnel() {
  const relatedDelivery_personnel0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Delivery0 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Delivery0?.setDelivery_personnel) {
    await Delivery0.setDelivery_personnel(relatedDelivery_personnel0);
  }

  const relatedDelivery_personnel1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Delivery1 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Delivery1?.setDelivery_personnel) {
    await Delivery1.setDelivery_personnel(relatedDelivery_personnel1);
  }

  const relatedDelivery_personnel2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Delivery2 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Delivery2?.setDelivery_personnel) {
    await Delivery2.setDelivery_personnel(relatedDelivery_personnel2);
  }

  const relatedDelivery_personnel3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Delivery3 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Delivery3?.setDelivery_personnel) {
    await Delivery3.setDelivery_personnel(relatedDelivery_personnel3);
  }
}

async function associateOrderWithConsumer() {
  const relatedConsumer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setConsumer) {
    await Order0.setConsumer(relatedConsumer0);
  }

  const relatedConsumer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setConsumer) {
    await Order1.setConsumer(relatedConsumer1);
  }

  const relatedConsumer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setConsumer) {
    await Order2.setConsumer(relatedConsumer2);
  }

  const relatedConsumer3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setConsumer) {
    await Order3.setConsumer(relatedConsumer3);
  }
}

// Similar logic for "relation_many"

async function associateProductWithFarmer() {
  const relatedFarmer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Product0 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Product0?.setFarmer) {
    await Product0.setFarmer(relatedFarmer0);
  }

  const relatedFarmer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Product1 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Product1?.setFarmer) {
    await Product1.setFarmer(relatedFarmer1);
  }

  const relatedFarmer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Product2 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Product2?.setFarmer) {
    await Product2.setFarmer(relatedFarmer2);
  }

  const relatedFarmer3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Product3 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Product3?.setFarmer) {
    await Product3.setFarmer(relatedFarmer3);
  }
}

async function associateReviewWithConsumer() {
  const relatedConsumer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setConsumer) {
    await Review0.setConsumer(relatedConsumer0);
  }

  const relatedConsumer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setConsumer) {
    await Review1.setConsumer(relatedConsumer1);
  }

  const relatedConsumer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setConsumer) {
    await Review2.setConsumer(relatedConsumer2);
  }

  const relatedConsumer3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review3 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Review3?.setConsumer) {
    await Review3.setConsumer(relatedConsumer3);
  }
}

async function associateReviewWithProduct() {
  const relatedProduct0 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setProduct) {
    await Review0.setProduct(relatedProduct0);
  }

  const relatedProduct1 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setProduct) {
    await Review1.setProduct(relatedProduct1);
  }

  const relatedProduct2 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setProduct) {
    await Review2.setProduct(relatedProduct2);
  }

  const relatedProduct3 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review3 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Review3?.setProduct) {
    await Review3.setProduct(relatedProduct3);
  }
}

async function associateSubscriptionWithConsumer() {
  const relatedConsumer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Subscription0 = await Subscriptions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Subscription0?.setConsumer) {
    await Subscription0.setConsumer(relatedConsumer0);
  }

  const relatedConsumer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Subscription1 = await Subscriptions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Subscription1?.setConsumer) {
    await Subscription1.setConsumer(relatedConsumer1);
  }

  const relatedConsumer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Subscription2 = await Subscriptions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Subscription2?.setConsumer) {
    await Subscription2.setConsumer(relatedConsumer2);
  }

  const relatedConsumer3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Subscription3 = await Subscriptions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Subscription3?.setConsumer) {
    await Subscription3.setConsumer(relatedConsumer3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Deliveries.bulkCreate(DeliveriesData);

    await Orders.bulkCreate(OrdersData);

    await Products.bulkCreate(ProductsData);

    await Reviews.bulkCreate(ReviewsData);

    await Subscriptions.bulkCreate(SubscriptionsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateDeliveryWithOrder(),

      await associateDeliveryWithDelivery_personnel(),

      await associateOrderWithConsumer(),

      // Similar logic for "relation_many"

      await associateProductWithFarmer(),

      await associateReviewWithConsumer(),

      await associateReviewWithProduct(),

      await associateSubscriptionWithConsumer(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('deliveries', null, {});

    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('products', null, {});

    await queryInterface.bulkDelete('reviews', null, {});

    await queryInterface.bulkDelete('subscriptions', null, {});
  },
};
