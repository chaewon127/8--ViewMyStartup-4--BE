// `comparisonList`의 각 기업에 대해 전체 기업 데이터(`data`)에서 순위를 찾아 추가
    // `data`는 `rankOrder`에 따라 이미 정렬된 상태 => `findIndex`로 찾은 인덱스 = 순위
    return comparisonList
      .map((company) => {
        // 순위 라벨링
        const rank = data.findIndex((item) => item.id === company.id) + 1;
        return { ...company, rank: rank > 0 ? `${rank}위` : "" };
      })
      .sort((a, b) => {
        // 문자열에서 숫자만 추출하여 정수로 변환하는 함수
        const parseValue = (str) =>
          parseInt(String(str).replace(/[^0-9]/g, ""), 10) || 0;

        switch (rankOrder) {
          case "investmentLowest":
            return parseValue(a.investment) - parseValue(b.investment);
          case "investmentHighest":
            return parseValue(b.investment) - parseValue(a.investment);
          case "salesLowest":
            return parseValue(a.revenue) - parseValue(b.revenue);
          case "salesHighest":
            return parseValue(b.revenue) - parseValue(a.revenue);
          case "employeeLowest":
            return parseValue(a.employees) - parseValue(b.employees);
          case "employeeHighest":
            return parseValue(b.employees) - parseValue(a.employees);
          default:
            return 0;
        }
      });
  }, [comparisonList, data, rankOrder]);