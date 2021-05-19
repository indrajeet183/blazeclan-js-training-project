import { Component } from 'react'
import CategoryService from '../../services/category/category'
import { ListGroup } from '../UI/CategoryListGroup'
import CategoryInput from './CategoryInput'
import Alert from '../UI/Alert'

class Category extends Component {

    constructor() {
        super()
        this.state = {
            categories: [],
            subCategories: [],
            filteredCategories: [],
            selectedParent: false,
            responseType: '',
            responseMessage: '',
            alertToggeled: false,
            selectedCategory: false,
            selectedSubCategory: false,
            deleteCategory: false,
            deletedSubCategory: false
        }
        this.CategoryService = new CategoryService()
    }

    componentDidMount = () => {
        this.getCategories()
    }

    getCategories = async () => {
        const categoyResp = await this.CategoryService.getCategories()
        if (categoyResp.data.success) {
            const categories = categoyResp.data.data
            this.setState({ categories, responseType: 'success', responseMessage: categoyResp.data.msg })
            this.toggleAlert()
        } else {
            this.setState({ responseType: 'danger', responseMessage: categoyResp.data.msg })
            this.toggleAlert()
        }

        const subCategoyResp = await this.CategoryService.getSubCategories()
        if (subCategoyResp.data.success) {
            const subCategories = subCategoyResp.data.data
            this.setState({ subCategories, responseType: 'success', responseMessage: categoyResp.data.msg })
            this.toggleAlert()
        } else {
            this.setState({ responseType: 'danger', responseMessage: categoyResp.data.msg })
            this.toggleAlert()
        }


        if (this.state.selectedParent) {
            this.onCategorySelect(this.state.selectedParent)
        }
    }

    onCategorySelect = (parent_id) => {
        const filteredCategories = this.state.subCategories.filter(subCat => subCat.parent_id === parent_id)
        this.setState({ filteredCategories, selectedParent: parent_id })
    }

    toggleAlert = () => {
        this.setState({ alertToggeled: true })
        setTimeout(() => {
            this.setState({ alertToggeled: false })
        }, 2500)
    }

    onHandleEdit = async (isSub, updatedRow) => {
        if (!isSub) {
            this.setState({ selectedCategory: { ...updatedRow } })
        } else {
            this.setState({ selectedSubCategory: { ...updatedRow } })
        }

    }

    onHandleDelete = async (isSub, id) => {
        console.log(isSub, id)
        if (!isSub) {
            this.setState({ deleteCategory: id })
            await this.CategoryService.deleteCategory(id)
            this.getCategories()
        } else {
            this.setState({ deletedSubCategory: id })
            await this.CategoryService.deleteSubCategory(id)
            this.getCategories()
        }
    }

    render() {
        let subClass = " d-none"
        if (this.state.selectedParent) subClass = ""
        return (
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-sm-2 mt-3">
                        <CategoryInput isSub={false} selectedCategory={this.state.selectedCategory}
                            selectedParent={this.state.selectedParent} refreshData={this.getCategories}
                            data={this.state.categories}
                        />
                    </div>
                    <div className="col text-center">
                        <h2>Categories</h2>
                        <ListGroup isSub={false} data={this.state.categories} cursor="true" onListSelect={this.onCategorySelect}
                            onEdit={this.onHandleEdit} onDelete={this.onHandleDelete} />
                    </div>
                    <div className={"col text-center" + subClass}>
                        <h2>Sub Categories</h2>
                        <ListGroup isSub={true} data={this.state.filteredCategories} cursor="false"
                            onEdit={this.onHandleEdit} onDelete={this.onHandleDelete} />
                    </div>
                    <div className={"col-sm-2 mt-3" + subClass}>
                        <CategoryInput isSub={true} selectedSubCategory={this.state.selectedSubCategory}
                            selectedParent={this.state.selectedParent} refreshData={this.getCategories}
                            data={this.state.subCategories}
                        />
                    </div>
                </div>
                <Alert type={this.state.responseType} message={this.state.responseMessage} show={this.state.alertToggeled} />
            </div>
        )
    }
}

export default Category