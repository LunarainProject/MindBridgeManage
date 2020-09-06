import json from "./disc.json";

var DiscDataManage = /** @class */ (function () {
    function DiscDataManage(data) {
        this._data = data;
        this._disc = this.readDiscJson(json);
    }
    DiscDataManage.prototype.readDiscJson = function (json) {
        return json.map(function (line) {
            var Type = line[0], TypeName = line[1], ProType = line[2], Character = line[3]["성격적 특징"], attitude = line[3]["태도와 사교성"];
            return { Type: Type, TypeName: TypeName, ProType: ProType, Character: Character, attitude: attitude };
        });
    };
    DiscDataManage.prototype.getSortedArray = function () {
        var _this = this;
        return Object.keys(this._data).map(function (key) { return ({
            code: key,
            value: _this._data[key]
        }); }).sort(function (a, b) { return b.value - a.value; });
    };
    DiscDataManage.prototype.calcDisc = function () {
        var sorted = this.getSortedArray();
        var first = sorted[0], second = sorted[1], third = sorted[2], fourth = sorted[3];
        if (first.value - second.value >= 15) {
            return first.code;
        }
        else {
            return sorted.filter(function (disc) { return disc.value >= 10; }).reduce(function (acc, disc) { return acc + disc.code; }, "");
        }
    };
    DiscDataManage.prototype.getTypes = function () {
        var code = this.calcDisc();
        return this._disc.filter(function (disc) {
            return disc.Type === code;
        })[0];
    };
    return DiscDataManage;
}());

export default DiscDataManage;