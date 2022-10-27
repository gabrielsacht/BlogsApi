module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost,
      { foreignKey: 'categoryId', as: 'blog_posts', otherKey: 'postId', through: PostCategory });
    models.BlogPost.belongsToMany(models.Category,
      { through: PostCategory, as: 'categories', foreignKey: 'postId', otherKey: 'categoryId'});
  };

  return PostCategory;
};