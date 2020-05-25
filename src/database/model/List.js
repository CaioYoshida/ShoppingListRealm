import { Model } from '@nozbe/watermelondb';
import { date, readonly, field } from '@nozbe/watermelondb/decorators';

export default class List extends Model {
  static table = 'lists';

  @field('name') name;
  @field('products') items;
  @date('date') date;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
