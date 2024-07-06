import { Stats } from "./Stats"

export class Item {
  code = ''
  product_name = ''
  genericName = ''
  producer = ''
  category = ['']
  quantity_value = ''
  quantity_type = ''
  keywords = ['']
  preffered_image = ''
  nutriments = {}
  nutriments_per = ''
  customImageUrl = ''

  constructor(
    itemCode: string,
    product_name: string,
    genericName: string,
    producer: string,
    category: string[] | string,
    qntValue: string,
    qntType: string,
    keywords: string[] | string,
    prefImage: string,
    nutriments: {},
    nutrimentsPer: string,
    customImageUrl: string
  ) {
    this.code = itemCode
    this.product_name = product_name
    this.genericName = genericName
    this.producer = producer

    if (Object.prototype.toString.call(category) === '[object Array]') {
      this.category = category as []
    } else {
      this.category =
        (category as string).split(',') === category
          ? [category as string]
          : (category as string).split(',')
    }

    if (Object.prototype.toString.call(keywords) === '[object Array]') {
      this.keywords = keywords as []
    } else {
      this.keywords =
        (keywords as string).split(',') === keywords
          ? [keywords as string]
          : (keywords as string).split(',')
    }

    this.quantity_value = qntValue
    this.quantity_type = qntType
    this.preffered_image = prefImage
    this.nutriments = nutriments
    this.nutriments_per = nutrimentsPer
    this.customImageUrl = customImageUrl
  }
}

// export const loadItem = async (code: string): Promise<Item | undefined> => {

//   const url = 'http://localhost:5173/api'
//   const item = await fetch(url + '/items', {headers: {"itemId": code}}).then((result) => {
//       result.json().then((json) => {
//         return json;
//       })
//     })

//     return item as Item
// }


export const getQuantityString = (quantity_value: string, quantity_type: string, amount_multiplier = 1): string => {

    const quantityValueFloat = parseFloat(quantity_value) * amount_multiplier

    if(quantity_type === "KG") {
        if(quantityValueFloat < 1) {
            return Math.round(quantityValueFloat * 1000.0).toString() + " g"
        } 

        if(quantityValueFloat >= 1) {
            return quantityValueFloat.toPrecision(3).toString() + " Kg"
        }
    }

    if(quantity_type === "L") {
      if(quantityValueFloat < 1) {
          return Math.round(quantityValueFloat * 1000.0).toString() + " ml"
      } 

      if(quantityValueFloat >= 1) {
          return quantityValueFloat.toPrecision(3).toString() + " l"
      }
  }

    return "No Value"
}

export const getQuantityTypeString = (quantity_type: string): string => {


    if(quantity_type === "KG") {
       return "Kg"
    }

    if(quantity_type === "L") {
        return "l"
    }

    if(quantity_type === "P") {
        return "pcc";
    }

    return "No Value"
}

export const calculateStats = (item: Item): Stats => {
  return new Stats(item);
}