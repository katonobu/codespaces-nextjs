import React from 'react';

const HandleMainProvisionComponent = ({ data }) => {
  const renderNestedData = (data) => {
    // データがオブジェクトの場合
    if (typeof data === 'object' && data !== null) {
      return (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {renderNestedData(value)}
            </li>
          ))}
        </ul>
      );
    }
    // データが配列の場合
    else if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{renderNestedData(item)}</li>
          ))}
        </ul>
      );
    }
    // データがプリミティブ値の場合
    else {
      return data;
    }
  };

  const extract_to_string = (data) => {
    let ret_str = '';
    if (typeof data === 'string') {
      ret_str = data;
    } else if ('#text' in data) {
      if ('Ruby' in data) {
        if (Array.isArray(data.Ruby)) {
          ret_str = data['#text']
          data.Ruby.forEach((item) => {
            ret_str += ('<' + item['#text'] + '(' + item.Rt + ')>')
          });
        } else {
          ret_str = data['#text'] + '<' + data.Ruby['#text'] + '(' + data.Ruby.Rt + ')>'
        }
      } else {
        // Line,Sup,Subは未対応
        ret_str = data['#text']
      }        
    }
    return ret_str
  }

  const renderNestedData2 = (data) => {
    // データがオブジェクトの場合
    if (typeof data === 'object' && data !== null) {
      return (
        Object.entries(data).map(([key, value]) => {
          if ( // attributeは表示対象から外す
            key === '@_Era' ||
            key === '@_Year' ||
            key === '@_Num' ||
            key === '@_PromulgateMonth' ||
            key === '@_PromulgateDay' ||
            key === '@_LawType' ||
            key === '@_Lang' ||
            key === '@_Subject' ||
            key === '@_Kana' ||
            key === '@_Abbrev' ||
            key === '@_AbbrevKana' ||
            key === '@_Extract' ||
            key === '@_Delete' ||
            key === '@_Hide' ||
            key === '@_CommonCaption' ||
            key === '@_OldStyle' ||
            key === '@_OldNum' ||
            key === '@_Function' ||
            key === '@_Indent' ||
            key === '@_WritingMode' ||
            key === '@_LineBreak'||
            key === '@_Align' ||
            key === '@_Type' ||
            key === '@_AmendLawNum' ||
            key === '@_BorderTop' ||
            key === '@_BorderBottom' ||
            key === '@_BorderLeft' ||
            key === '@_BorderRight' ||
            key === '@_colspan' ||
            key === '@_rowspan' ||
            key === '@_Valign' ||
            key === `@_src` ||
            key === '@_Style' ||
            false
          ) {
            return
          } else if (
            // 子要素にLine,Ruby,Sup,SubのcomplexTypeしか持たないもの
            key === 'PartTitle' ||
            key === 'ChapterTitle' ||
            key === 'SectionTitle' ||
            key === 'SusbsectionTitle' ||
            key === 'DivisionTitle' ||
            key === 'ArticleTitle' ||
            key === 'ArticleCaption' ||
            key === 'ParagraphCaption' ||
            key === 'ParagraphNum' ||
            key === 'SupplNote' ||
            key === 'ClassTitle' ||
            key === 'ClassSentence' ||
            key === 'ItemTitle' ||
            key === 'Subitem1Title' ||
            key === 'Subitem2Title' ||
            key === 'Subitem3Title' ||
            key === 'Subitem4Title' ||
            key === 'Subitem5Title' ||
            key === 'Subitem6Title' ||
            key === 'Subitem7Title' ||
            key === 'Subitem8Title' ||
            key === 'Subitem9Title' ||
            key === 'Subitem10Title' ||
            key === 'SupplProvisionLabel' ||
            key === 'SupplProvisionAppdxTableTitle' ||
            key === 'SupplProvisionAppdxStyleTitle' ||
            key === 'AppdxTableTitle' ||
            key === 'AppdxNoteTitle' ||
            key === 'AppdxStyleTitle' ||
            key === 'AppdxFormatTitle' ||
            key === 'ArithFormulaNum' ||
            key === 'AppdxFigTitle' ||
            key === 'TableStructTitle' ||
            key === 'TableHeaderColumn' ||
            key === 'FigStructTitle' ||
            key === 'NoteStructTitle' ||
            key === 'StyleStructTitle' ||
            key === 'FormatStructTitle' ||
            key === 'RelatedArticleNum' ||
            key === 'RemarksLabel' ||
            false
          ) {
            return <p>{extract_to_string(value)}</p>
          } else if (
            key === '#text'
          ) {
            return <p>{value}</p>
          } else if (
            key === 'Sentence'
          ) {
            if (value === 'string') {
              return <p>{value}</p>
            } else if (Array.isArray(value)) {
              return value.map((item) => <p>{extract_to_string(item)}</p>)
            } else {
              return <p>{extract_to_string(value)}</p>
            }
          } else {
            // 非表示、テキスト以外のオブジェクトなら、valueを引数に再起呼び出し。
            if (key.startsWith('@_')) {
              // attributeで見落としているのがあればここで表示させる。
              console.log(key)
            }
            return renderNestedData2(value)
          }
        })
      );
    }
    // データが配列の場合
    else if (Array.isArray(data)) {
      return (data.map((item) => renderNestedData2(item)));
    }
    // データがプリミティブ値の場合
    else {
      return <p>{data}</p>;
    }
  };

//  return <div>{renderNestedData(data)}</div>;
  return <div>{renderNestedData2(data)}</div>;
};

export default HandleMainProvisionComponent;
