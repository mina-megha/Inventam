const getNestedChildren = (arr, parent_id = 0) => {
  var subCategory = [];
  for (var i = 0; i < arr.length; ++i) {
    console.log(arr, parent_id);
    if (arr[i].parentCategoryId == parent_id) {
      var grandChildren = getNestedChildren(arr, arr[i].id);

      if (grandChildren.length) {
        arr[i].subCategory = grandChildren;
      }
      subCategory.push(arr[i]);
    }
  }
  return subCategory;
};

const pagination = async (limit, page, totalCount) => {
  var totalPage = Math.ceil(totalCount / limit);
  var previousPage = page - 1;
  var prevPage;

  if (previousPage == 0) {
    prevPage = 0;
  } else {
    prevPage = previousPage;
  }
  var nextPage = page + 1;
  if (nextPage > totalPage) {
    nextPage = 0;
  } else {
    nextPage = nextPage;
  }

  var pagination = {
    previousPage: prevPage,
    currentPage: page,
    nextPage: nextPage,
    totalCount: totalCount,
    perPage: limit,
    totalPage: totalPage,
  };

  return pagination;
};

module.exports = { getNestedChildren, pagination };
