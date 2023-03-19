

  const navigateAfoona = (search, ingrids, page) =>{

    let path = ''
    if((search === undefined || search === '') && (ingrids !== undefined && ingrids !== '') && page === undefined )
      path = `/recipes/${ingrids}.html`

    else if((search === undefined || search === '') && (ingrids !== undefined && ingrids !== '') && page !== undefined )
      path = `/recipes/${ingrids}/${page}.html`
  
    else if((search !== undefined && search !== '') && (ingrids === undefined || ingrids === '') && page === undefined )
      path = `/${search}/index.html`

    else if((search !== undefined && search !== '') && (ingrids === undefined || ingrids === '') && page !== undefined )
      path = `/${search}/index/${page}.html`
    
    else if((search !== undefined && search !== '') && (ingrids !== undefined && ingrids !== '') && page === undefined )
      path = `/${search}/${ingrids}.html`

    else if((search !== undefined && search !== '') && (ingrids !== undefined && ingrids !== '') && page !== undefined )
      path = `/${search}/${ingrids}/${page}.html`

    else if((search === undefined || search === '') && (ingrids === undefined || ingrids === '') && page !== undefined)
      path = `/recipes/index/${page}.html`
    else
      path = '/'
   
    return path 
  }

  const ingridsToArr = (ingrids) =>{
    let result = [[],[]]

    if(ingrids === '' || ingrids === undefined)
      return result

    let to_process = ingrids.split(',')

    for(let i = 0; i < to_process.length; i++){
      if(to_process[i].charAt(0) === '-'){
        result[1].push(to_process[i].substring(1, to_process[i].length))
      }
      else{
        result[0].push(to_process[i])
      }
    }

    return result
  }

  const arrToIngrids = (ingrids) =>{
    
    if(ingrids[0].length === 0 && ingrids[1].length === 0){
      return ''
    }
     

    else if(ingrids[0].length !== 0 && ingrids[1].length === 0){
      console.log(ingrids[0].join(','))   
      return ingrids[0].join(',') 
    }
  
    else if(ingrids[0].length === 0 && ingrids[1].length !== 0){

      for(let i = 0; i < ingrids[1].length; i++){
        ingrids[1][i] = '-'.concat(ingrids[1][i])
      }
      console.log(ingrids[1].join(','))  
      return ingrids[1].join(',')
    }

    else{
      for(let i = 0; i < ingrids[1].length; i++){
        ingrids[1][i] = '-'.concat(ingrids[1][i])
      }
      console.log(ingrids[0].concat(ingrids[1]).join(','))
      return ingrids[0].concat(ingrids[1]).join(',')
    }
    
      
    
  }
    
module.exports = {

    navigateAfoona,
    arrToIngrids,
    ingridsToArr
}