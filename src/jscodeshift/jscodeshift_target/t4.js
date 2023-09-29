

class apple {
  async getTemplateById(id) {
    return this.templateRepository.findOneBy({ id });
  }
}
