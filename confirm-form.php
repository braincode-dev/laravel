<form action="{{ route('image.delete', ['id' => $edit_category['id']]) }}" method="POST" onsubmit="return confirm('Действительно хотите удалить картинку?');">
     {{csrf_field()}}
     <button type="submit">Удалить</button>
</form>
