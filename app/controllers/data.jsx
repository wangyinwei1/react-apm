export default {
    histogramPerformance(id){
        const data = [10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 24, 12,10, 20, 30, 40, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12, 5, 33, 24, 12,];
    
        for(var i=0;i<30;i++){
            data.concat()
        }
        let xAxisData = [];

         for(var i=0;i<30;i++){
            xAxisData.push(i+1);
        }
       
        return {
            data,
            xAxisData
        };
    }
}