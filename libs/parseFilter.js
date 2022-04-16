const {Countries, Sports, sequelize} = require('../models');
const {Op} = require('sequelize');

const mapOperator = (operator) =>{
  switch (operator) {
    case 'equals':
      return Op.eq;
    case 'notEquals':
      return Op.not;
    case 'lessThan':
      return Op.lt;
    case 'lessThanOrEqual':
      return Op.lte;
    case 'greaterThan':
      return Op.gt;
    case 'greaterThanEqual':
      return Op.gte;
    default:
      return null;
  }
}

const getPagination = (body) => {
  const offset = body.startRow || 0;
  const limit = (body.endRow || 100) - offset;

  return {offset, limit};
}

const getSorting = (body) => {
  let order = {};

  if (!body.sortModel?.length) {
    return null;
  }
  
  order = body.sortModel.map((item) => {
    const col = item.colId;
    const cols = col.split('.');

    if (cols.length > 1) {
      return [cols[0], sequelize.literal(''), cols[1], item.sort];
    }

    return [col, item.sort];
  });

  return order;
}

const getFiltering = (body, options) => {
  const where = {};

  for (const col of Object.keys(body?.filterModel || {})) {
    const cols = col.split('.');
    const val = body.filterModel[col]?.values;
    const filterType = body.filterModel[col]?.filterType;
    const typeOperator = body.filterModel[col]?.type;
    const valueOperator = body.filterModel[col]?.filter;
    const dateFrom = body.filterModel[col]?.dateFrom;
    const rgx = `(${val?.join('|')})`;

    if (filterType === 'set') {
      if (cols.length > 1 && val?.length) {
        const includeIdx = options.include.findIndex((item) => item.as === cols[0]);
        options.include[includeIdx] = {
          ...options.include[includeIdx],
          where: {[cols[1]]: {[Op.regexp]: rgx}}
        }
      } else if (val?.length) {
        where[col] = {[Op.regexp]: rgx};
      }
    } else if (filterType === 'number' && typeOperator && valueOperator) {
      const operator = mapOperator(typeOperator);
      if (operator) {
        where[col] = {[operator]: valueOperator};
      }
    } else if (filterType === 'date' && typeOperator && dateFrom) {
      const operator = mapOperator(typeOperator);
      if (operator) {
        where[col] = {[operator]: dateFrom};
      }
    }
  }

  if (!Object.keys(where).length) {
    return null;
  }

  return where;
}

const parseFilter = (req) => {
  const options = {
    include: [
      {
        model: Countries,
        as: 'country',
        attributes: ['name']
      },
      {
        model: Sports,
        as: 'sport',
        attributes: ['name']
      },
    ],
  };

  const {offset, limit} = getPagination(req.body);
  if (offset !== null && offset !== undefined && limit !== null && limit !== undefined) {
    options.offset = offset;
    options.limit = limit;
  }

  const sorting = getSorting(req.body);
  if (sorting) {
    options.order = sorting;
  }

  const filter = getFiltering(req.body, options);
  if (filter) {
    options.where = filter;
  }

  return options;
}

module.exports = {
  parseFilter
}