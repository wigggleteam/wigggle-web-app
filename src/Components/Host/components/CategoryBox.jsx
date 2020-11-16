import React from 'react';
import _ from 'lodash';
import { Button, Icon } from 'semantic-ui-react';
import styles from '../style.less';

const CategoryBox = ({id, category, useCategory, handleCategorySelect, useSubCategory}) => {
  const [selectedCategory, setSelectedCategory] = useCategory();
  const [selectedSubCategory, setSelectedSubCategory] = useSubCategory();

  return(
    <div className={styles.categoryBox} onClick={() => { setSelectedCategory(id); setSelectedSubCategory(null) }}>
      <div className={styles.categoryName} key={id} >
        {category.label}
      </div>
      {selectedCategory === id && 
        <>
          <div className={styles.subCategories}>
            {_.map(category.subCategories, (value, key) => (
              <div key={key} className={styles.eachSubCategory} onClick={(e) => { e.stopPropagation(); setSelectedSubCategory(key);}}> 
                { selectedSubCategory === key ? <Icon name="star" className={styles.golden} /> : <Icon name="star outline" /> }
                { value.label } 
                { selectedSubCategory === key ? <Icon name="star" className={styles.golden} /> : <Icon name="star outline" /> }
              </div>
            ))}
          </div>
          <br />
          <Button 
            content='Select' 
            icon='right arrow' 
            labelPosition='right' 
            onClick={(e) => { e.stopPropagation(); handleCategorySelect(id)}} 
            disabled={!selectedCategory || !selectedSubCategory}/>
        </>
      }
      <div style={{clear: 'both'}}></div>
    </div>
  )

}

export default CategoryBox;
