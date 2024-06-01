"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceFunction1684072653555 = void 0;
class distanceFunction1684072653555 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE OR REPLACE FUNCTION distance(
        lat1 double precision,
        lon1 double precision,
        lat2 double precision,
        lon2 double precision)
      RETURNS double precision AS
    $BODY$
    DECLARE
        R integer = 6371e3; -- Meters
        rad double precision = 0.01745329252;
    
        var1 double precision = lat1 * rad;
        var2 double precision = lat2 * rad;
        var3 double precision = (lat2-lat1) * rad;
        var4 double precision = (lon2-lon1) * rad;
    
        a double precision = sin(var3/2) * sin(var3/2) + cos(var1) * cos(var2) * sin(var4/2) * sin(var4/2);
        c double precision = 2 * atan2(sqrt(a), sqrt(1-a));    
    BEGIN                                                     
        RETURN R * c;        
    END  
    $BODY$
      LANGUAGE plpgsql VOLATILE
      COST 100;`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP FUNCTION distance(double precision,double precision,double precision,double precision);`);
        });
    }
}
exports.distanceFunction1684072653555 = distanceFunction1684072653555;
//# sourceMappingURL=1684072653555-distanceFunction.js.map