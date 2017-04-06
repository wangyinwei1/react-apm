export default {
    histogramPerformance(id){
        const data = [10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24,12, 5, 33, 24, 12, 5, 33, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,32];

        let xAxisData = [];


        IM.List(data).map((data,i)=>{
            if(i%5 == 0){
                xAxisData.push(i.toString().length == 2?'12:'+i.toString():'12:0'+i);
            };
            
        })
        
        return {
            data,
            xAxisData
        };
    }
}