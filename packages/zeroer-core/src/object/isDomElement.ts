const isDomElement = (arg: any): arg is HTMLElement => arg && arg.nodeType === 1

export default isDomElement
